import { bindable, bindingMode, containerless, inject, computedFrom } from "aurelia-framework";
import { _Control } from "./_control";

@containerless()
@inject(Element)
export class Numeric extends _Control {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  // numeric properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) step;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) min;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) max;
  constructor(element) {
    super(element);
  }

  bind()
  {
    this.value = this.value || 0;
  }
}
