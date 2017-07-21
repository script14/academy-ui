import { bindable,inject } from "aurelia-framework";

import { Router } from 'aurelia-router';
import { RestService } from "../../lib/rest-service";
import createLoopbackFilterObject from "../../lib/loopback-filter-factory";
import moment from "moment";

@inject(Router)
export class ProjectChart {
    
    constructor(router) {
        this.serviceProjects =  new RestService("core", "projects");
        this.serviceAssignment =  new RestService("core", "Assignment");
        this.router = router;
        this.getProject();
    }

    async getProject() {
        this.projects = await this.serviceProjects.get();
        var progress = [];
        for(var item of this.projects) {
            var progressService = new RestService("core", `projects/${item.id}/progress`);
            progress.push(progressService.get());
        }
        
        Promise.all(progress).then(results => {
            for(var index in results) {
                this.projects[index].progress = results[index].progress;    
            }
        })
    }

    __viewBacklog(id) {
        this.router.navigateToRoute('view', { id: id });
    }
    
}