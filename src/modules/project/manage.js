export class manage {

  async activate(params) {
    var id = params.id;
  }

  configureRouter(config, router) {
    config.map([
      { route: '/', name: 'manage', nav: false, viewPorts: { backlogs: { moduleId: "./partials/backlogs" }, iterations: { moduleId: "./partials/iterations" } } }
    ]);
    this.router = router;
  }
}