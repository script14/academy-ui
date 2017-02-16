import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import { _Control } from "../_control";
var STATE = require("../_state");

@containerless()
@customElement("au-input")
@inject(Element)
export class _Input extends _Control {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) inputOptions;

  @bindable editorState = STATE.VIEW;
  @bindable editorValue;
  @bindable type;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) keydown;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) stateChanged;

  _defaultOptions = {
    selectOnFocus: true
  }

  constructor(element) {
    super(element);
  }

  bind() {
    this.placeholder = this.placeholder || "enter value";
    this.editorValue = this.value;
    this._options = Object.assign(this._defaultOptions, this._options);
  }

  onBlur(event) {
    this.editorState = STATE.VIEW;
  }

  onFocus(event) {
    this.editorState = STATE.EDIT;
    this.control = event.target;
  }

  editorValueChanged(newValue) {
    this.value = this.editorValue;
  }

  editorStateChanged(newValue) {
    if (this.stateChanged)
      this.stateChanged(this);
      
    if (this.control && this.editorState === STATE.EDIT && this._options.selectOnFocus) {
      this.control.select();
    }
  }

  _onkeydown(event) {
    if (this.keydown)
      return this.keydown(event);
    else
      return true;
  }
}
