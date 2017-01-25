import { bindable } from "aurelia-framework";

export class create {
  @bindable data;
  @bindable error;

  async activate() {
    this.data = {
      dropdown: {
        value: 3,
        text: "Three"
      }
    };
  }
}
