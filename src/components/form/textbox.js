import { bindable, bindingMode, containerless, inject, computedFrom } from "aurelia-framework";
import { _Control } from "./_control";

@containerless()
@inject(Element)
export class Textbox extends _Control {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  constructor(element) {
    super(element);
  }
}
