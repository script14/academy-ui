import { transient, bindable, bindingMode, noView, inject, computedFrom, customElement, containerless } from "aurelia-framework";

@inject(Element)
@containerless() 
@customElement("au-layout")
export class _Layout {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  constructor(element) {
    this.element = element;
  }

  bind(context) {

    console.log(JSON.stringify(this.options));
    console.log(this.label);
  }

  @computedFrom("error")
  get hasError() {
    return (this.error || "").toString().length > 0;
  }

  @computedFrom("_label")
  get hasLabel() {
    var hasLabel = (this.label || "").toString().length > 0;// && this._label.length == 0; 
    return hasLabel;
  }

  @computedFrom("label", "options.label")
  get _label() {
    var defaultLength = (this.label || "").toString().length > 0 ? 3 : 0;
    var _options = Object.apply({}, !this.options || !this.options.label ? {} : this.options.label);
    _options.length = _options.length || defaultLength;
    _options.align = (_options.align || "right").toLowerCase() === "right" ? "right" : "left";
    // console.log(`${this.label} : ${JSON.stringify(_options)}`)
    return _options;
  }

  @computedFrom("hasLabel")
  get _control() {
    var defaultLength = this.hasLabel ? 12 - this._label.length : 12;
    var _options = Object.apply({}, !this.options || !this.options.control ? { length: defaultLength } : this.options.control);
    _options.length = _options.length || defaultLength;

    // console.log(`${this.label} : ${JSON.stringify(_options)} : ${defaultLength} : ${this.hasLabel}`)
    return _options;
  }

  @computedFrom("hasLabel", "hasError", "_control")
  get _style() {
    var style = {
      group: "form-group",
      label: "",
      control: `col-sm-${this._control.length}`
    };

    if (this.hasError)
      style.group += ` has-error`;
    if (this.hasLabel)
      style.label = `col-sm-${this._label.length} control-label text-${this._label.align}`;

    style.control = `col-sm-${this._control.length}`;
    // console.log(`${this.label} : ${JSON.stringify(this._label)} : ${JSON.stringify(style)} : ${this.hasLabel}`)
    return style;
  }
}
