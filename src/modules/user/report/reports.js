import { bindable, inject } from "aurelia-framework";
import { RestService } from "../../../lib/rest-service";
import { Router } from 'aurelia-router';
import { Dialog } from '../../../au-components/dialog/dialog';
import parseLoopbackError from "../../../lib/loopback-error-parser";
import createLoopbackFilterObject from "../../../lib/loopback-filter-factory";
import moment from "moment";
import { Assignments } from './assignments'


@inject(Router, Dialog)
export class reports{

    @bindable date_start;
    @bindable date_end;
    
    @bindable assignmentEfficiency;
    @bindable countAssignment;
    @bindable totalWorkTime;

    @bindable dataku;



                

    constructor(router, dialog) {
        this.service = new RestService("core", "accounts");    
        this.router = router; 
        this.dialog = dialog;

        this.efficiencyCount = 0;
        this.countAssignment = 0;
        this.totalWorkTime = 0;

        this.accountId;
        this.dataku = {};
    }

    async activate(params){
        var id = params.id;
        this.accountId = id;
        this.data = await this.service.get(id, { filter: { include: "profile" } });

        this.countAllAssignments(this.accountId);
        this.countTotalWorkTime(this.accountId);
        this.countTotalBudget(this.accountId);
        this.countTotalEfficiency(this.accountId);
        this.countClosedAssignment(this.accountId);
         
    }  
      
    async countAllAssignments(accountId){
        this.countAssignmentService = new RestService ("core",`reports/account/${this.accountId}/assignments/count`)
        this.countAssignment = await this.countAssignmentService.get();
    }

    async countTotalWorkTime(accountId){
        this.countWorkTime = new RestService("core",`reports/account/${this.accountId}/assignments/elapsed`)
        this.totalWorkTime = await this.countWorkTime.get();
      }

    async countTotalBudget(accountId){
        this.countBudgetTime = new RestService("core",`reports/account/${this.accountId}/assignments/budget`)
        this.totalBudget = await this.countBudgetTime.get();
    }

    async countTotalEfficiency(accountId){
        this.countEfficiency = new RestService("core",`reports/account/${this.accountId}/assignments/efficiency`)
        this.totalEfficiency = await this.countEfficiency.get();
    }

    async countClosedAssignment(accountId){
        this.countClosed = new RestService("core", `reports/account/${this.accountId}/assigments/closed`)
        this.totalClosedAssignment = await this.countClosed.get();
    }

  showAssignments() {
    var data = {"accountId": this.accountId}
    this.dataku = {datas: data};
    console.log(this.dataku);
  }
}