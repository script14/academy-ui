import { bindable, bindingMode, noView, inject, computedFrom, children } from "aurelia-framework";
import dispatchCustomEvent from "../../../lib/dispatch-custom-event";

@inject(Element)
export class Collection {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) items;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) headers;

  @bindable title = null;
  @bindable headerTemplate = null; 
  @bindable itemTemplate = null; 

  constructor(element) {
    this.element = element;
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
