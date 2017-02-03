import { bindable, bindingMode, noView, inject, computedFrom, children, customElement } from "aurelia-framework";
import { BindingEngine } from 'aurelia-binding';
import dispatchCustomEvent from "../../../lib/dispatch-custom-event";

@inject(Element, BindingEngine)
@customElement("au-collection")
export class Collection {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) items;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) errors;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;

  @bindable title = null;
  @bindable headerTemplate = null;
  @bindable itemTemplate = null;
  @bindable columns;

  defaultOptions = {
    control: {
      length: 12
    }
  }

  @bindable add;
  @bindable remove;

  @computedFrom("add", "remove")
  get buttons() {
    var buttons = {
      add: this.add && true,
      remove: this.remove && true
    }
    return buttons;
  }


  constructor(element, bindingEngine) {
    this.element = element;
    this.bindingEngine = bindingEngine;
  }

  bind() {
    this.items = this.items || [];
    this.errors = this.errors || [];
    this.data = this.data || [];
    this.columns = this.columns || [];
    this.buildData();

    let subscription = this.bindingEngine.collectionObserver(this.items)
      .subscribe(splices => {
        this.buildData();
      });
  }

  buildData() {
    this.data = this.items.map((item, index) => {
      return {
        data: item,
        error: this.errors[index],
        options: {
          readOnly: this.readOnly && true
        }
      }
    });
  }

  onadd(event) {
    if (this.add && typeof this.add === "function")
      this.add(event);
  }

  onremove(item) {
    var itemIndex = this.items.indexOf(item);
    this.items.splice(itemIndex, 1);

    if (this.remove && typeof this.remove === "function") {
      let event;
      var eventName = "remove";
      if (window.CustomEvent) {
        event = new CustomEvent(eventName, {
          detail: item,
          bubbles: true
        });
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, {
          detail: item
        });
      }
      this.remove(event);
    }
  }
}
