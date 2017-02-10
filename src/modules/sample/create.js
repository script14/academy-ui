import { bindable } from "aurelia-framework";

export class create {
  @bindable data;
  @bindable error;

  async activate() {
    this.error = {
      items: [
        { user: "inital data: user required" }
      ]
    };

    this.data = {
      items: [
        { user: null }
      ]
    };
  }
}
