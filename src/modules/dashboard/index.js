export class Index {
    configureRouter(config, router){
        this.router = router;

        config.map([
            { route: '/', name: 'list', moduleId: './list', nav: true, title: 'Dashboard List' },
            { route: '/view/:id', name: 'view', moduleId: './view', title: 'View Project' },
            { route: '/createProject', name: 'createProject', moduleId: './create-project', title: 'Create Project' },
            { route: '/createTask', name: 'createTask', moduleId: './create-task', title: 'Create Task' },
            { route: '/createAssignment', name: 'createAssignment', moduleId: './create-assignment', title: 'Create Assignment' },
            { route: '/createBacklog', name: 'createBacklog', moduleId: './create-backlog', title: 'Create Backlog' },
            
        ])
        
    }

}