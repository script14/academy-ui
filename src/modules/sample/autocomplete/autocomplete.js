import { bindable, computedFrom } from "aurelia-framework";

export class Autocomplete {
  value;
  label = "autocomplete"
  stringValue;
  options = {
    label: {
      length: 3,
      align: "left"
    },
    control: {
      length: 4
    }
  };

  @computedFrom("options.label.length")
  get controlMaxLength() {
    return 12 - this.options.label.length;
  }

  @computedFrom("options.control.length")
  get labelMaxLength() {
    return 12 - this.options.control.length;
  }

  get loader() {
    return (keyword) => fetch("https://api.github.com/users")
      .then(response => response.json())
  }

  changeCallback($event) {
    this.stringValue = JSON.stringify(this.value);
  }
  changed() {
    // console.log(JSON.stringify(this.options))
  }
}
