import { bindable, inject } from "aurelia-framework";
import { RestService } from "../../lib/rest-service";

export class Create {
  @bindable data;
  @bindable error;

  constructor() {
    this.service = new RestService("core", "projects");
  }

  created(owner, self)
  {
    this.data = {}
  }

  cancelCallback(event) {
    console.log(this.service);
  }
  saveCallback(event) {
    this.service.post(this.data);
    // console.log(this);
  }
}
