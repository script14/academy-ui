import { bindable, bindingMode, noView, inject, computedFrom, customElement, containerless } from "aurelia-framework";

@inject(Element)
@containerless()
@customElement("input-form")
export class InputForm {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) title;

  constructor(element) {
    this.element = element;
  }

  @bindable cancel;
  @bindable delete;
  @bindable save;
  @bindable edit;

  @computedFrom("element.delegatedCallbacks")
  get visibility() {
    var visibility = {
      cancel: this.cancel && true,
      delete: this.delete && true,
      edit: this.edit && true,
      save: this.save && true
    }
    console.log(this)
    return visibility;
  }

  oncancel(event) {
    if (this.cancel && typeof this.cancel === "function")
      this.cancel(event);
  }
  ondelete(event) {
    if (this.delete && typeof this.delete === "function")
      this.delete(event);
  }
  onedit(event) {
    if (this.edit && typeof this.edit === "function")
      this.edit(event);
  }
  onsave(event) {
    if (this.save && typeof this.save === "function")
      this.save(event);
  }
}
