import { bindable } from "aurelia-framework";

export class Dropdown {
  value;
  stringValue;  
  get loader() {
    return (keyword) => fetch("https://api.github.com/users")
      .then(response => response.json())
  }

  changeCallback($event) {
    this.stringValue = JSON.stringify(this.value);
    // console.log(`autocomplete value:${JSON.stringify(this.value)}`);
  }
}
