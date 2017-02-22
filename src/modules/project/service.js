import { inject } from "aurelia-framework";
import { RestService } from "../../lib/rest-service";

export class Service extends RestService {

  constructor() {
    super("core", "projects");
  }
}
