import { RestService } from "../../../lib/rest-service";
import { Tasks } from './tasks';
import "../../../../styles/dist/css/sb-admin-2.min.css";
import { bindable,inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import moment from "moment";

@inject(Router)
export class Backlogs {
  datas = [];
  tasks = {};

   constructor(router) {
        this.router = router;
        var serviceBacklogs = new RestService("core", "backlogs");
   }

  activate(model) {
    if(model.datas) this.datas = model.datas;    
  }
  __viewTasks(idBacklog) {
    var service = new RestService("core", `backlogs/${idBacklog}/tasks`);
    console.log("service");
    console.log(service);
    service.list().then(result => {
      this.tasks = {datas: result};
      console.log("this.tasks");
      console.log(this.tasks);
    })
  }

   createBacklog() {
    this.router.navigateToRoute('createBacklog');
  }
}  
  