import { bindable, computedFrom } from "aurelia-framework";

export class Index {
  x;
  label = "autocomplete";
  stringValue;

  options = {
    label: {
      length: 4,
      align: "right"
    },
    control: {
      length: 8
    }
  }; 

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
