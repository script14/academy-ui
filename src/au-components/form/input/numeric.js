import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import { _Input } from "./_input";
import numeral from 'numeral';
var STATE = require("../_state");
 
@customElement("au-numeric")
@inject(Element)
export class Numeric {
  // input properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;

  // numeric properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) step;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) min;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) max;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) format;

  @computedFrom("min", "max")
  get inputOptions() {
    return {
      "min": this.min,
      "max": this.max,
      "class":"form-control text-right"
    }
  }

  bind() {
    this.value = this.value || 0;
    this.editorValue = this.value || 0;
    this.format = this.format || "0,000.00";
  }

  get keydownCallback() {
    return (e) => {
      // Allow: backspace, delete, tab, escape, enter and .
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything 
        return true;
      }

      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
      
      return true;
    }
  }

  get stateChangeCallback() {
    return (context) => {
      context.editorValue = context.editorState === STATE.VIEW ? numeral(context.editorValue).format(this.format) : numeral(context.editorValue).value(this.format);
      context.value = numeral(context.editorValue).value(this.format);
    };
  }
} 
