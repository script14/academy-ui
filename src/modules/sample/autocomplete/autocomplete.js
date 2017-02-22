import { bindable, computedFrom } from "aurelia-framework";

export class Autocomplete {
  x;
  label = "autocomplete";
  stringValue;

  options = {
    label: {
      length: 4,
      align: "left"
    },
    control: {
      length: 8
    }
  };

  settingOptions = {
    label: {
      length: 4,
      align: "right"
    },
    control: {
      length: 8
    }
  }
  alignments = ["left", "right"];

  @computedFrom("options.label.length")
  get controlMaxLength() {
    return 12 - this.options.label.length;
  }

  @computedFrom("options.control.length")
  get labelMaxLength() {
    return 12 - this.options.control.length;
  }

  get loader() {
    return (keyword) => {
      return fetch("https://api.github.com/users").then(response => response.json())
    }
  }

  changeCallback($event) {
    this.stringValue = JSON.stringify(this.x);
  }
  changed() {
    // console.log(JSON.stringify(this.options))
  }
}
