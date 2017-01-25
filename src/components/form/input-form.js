import { bindable, bindingMode, noView, inject, computedFrom, customElement, containerless } from "aurelia-framework";

@inject(Element)
@containerless()
@customElement("input-form")
export class InputForm {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  constructor(element) {
    this.element = element;
  }

  @computedFrom("element.delegatedCallbacks")
  get visibility() {
    var callbacks = this.element.delegatedCallbacks;
    console.log(callbacks)
    return {
      submit: callbacks && callbacks.submit,
      cancel: callbacks && callbacks.cancel
    }
  }

  onsubmit(event) {
    this.element.delegatedCallbacks.submit(event);
  }
  oncancel(event) {
    this.element.delegatedCallbacks.cancel(event);
  }
}
