import { bindable, inject } from "aurelia-framework";
import { RestService } from "../../lib/rest-service";

export class Create {
  @bindable data;
  @bindable error;

  constructor() {
    this.service = new RestService("core", "projects");
  }

  cancelCallback(event) {
    console.log(this.service);
  }
  deleteCallback(event) {
    console.log(this);
  }
  saveCallback(event) {
    this.service.post(this.data);
    // console.log(this);
  }
}
