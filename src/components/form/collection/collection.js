import { bindable, bindingMode, noView, inject, computedFrom, children } from "aurelia-framework";
import { BindingEngine } from 'aurelia-binding';
import dispatchCustomEvent from "../../../lib/dispatch-custom-event";

@inject(Element, BindingEngine)
export class Collection {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) items;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) errors;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) headers;

  @bindable title = null;
  @bindable headerTemplate = null;
  @bindable itemTemplate = null;

  constructor(element, bindingEngine) {
    this.element = element;
    this.bindingEngine = bindingEngine;
  }

  bind() {
    this.items = this.items || [];
    this.errors = this.errors || [];
    this.data = this.data || [];
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
        error: this.errors[index]
      }
    });
  }

  onadd(event) {
    this.element.delegatedCallbacks.add(event);
  }

  onremove(item) {
    var itemIndex = this.items.indexOf(item);
    this.items.splice(itemIndex, 1);
    dispatchCustomEvent("remove", this.element, item);
  }
}
