import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { RestService } from "../../lib/rest-service";

@inject(Router)
export class List {
  constructor(router) {
    this.service = new RestService("core", "projects");
    this.router = router;
  }

  async activate() {
    this.data = await this.load();
  }

  async load() {
    return this.service.list();
  }

  view(id) {
    this.router.navigateToRoute('view', { id: id });
  }

  create() {
    this.router.navigateToRoute('create');
  }
  add() {
    this.data.push({ id: "add", code: "add", name: "add", description: "add" });
  }
}
