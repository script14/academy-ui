import { bindable, bindingMode, containerless, inject, computedFrom } from "aurelia-framework";
import { _Control } from "./_control";

@containerless()
@inject(Element)
export class Autocomplete extends _Control {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  id = "xlist"
  constructor(element) {
    super(element);
    console.log(this.element)
  }
}
