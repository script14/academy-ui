export class index {

  configureRouter(config, router) {
    config.map([ 
      { route: '/',         name: 'list',         moduleId: './list',         nav: true,      title: 'Project List' },
      { route: '/create',   name: 'create',       moduleId: './create',       nav: true,      title: 'Create Project' }
    ]);

    this.router = router;
  }
}
