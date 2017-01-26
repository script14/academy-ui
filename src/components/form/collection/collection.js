import { bindable, bindingMode, noView, inject, computedFrom } from "aurelia-framework";

@inject(Element)
export class Collection {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) items;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) headers;
  
  @bindable template = null;
  
  constructor(element) {
    this.element = element;
  }

  bind() {
    console.log(this.template)
    console.log("collection:bound");
  }

  onadd(event)
  {
    this.element.delegatedCallbacks.add(event);
  }
}
