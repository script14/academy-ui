import { bindable, inject } from "aurelia-framework";
import { RestService } from "../../../lib/rest-service";
import { Router } from 'aurelia-router';
import { Dialog } from '../../../au-components/dialog/dialog';
import parseLoopbackError from "../../../lib/loopback-error-parser";
import createLoopbackFilterObject from "../../../lib/loopback-filter-factory";
import moment from "moment";


@inject(Router, Dialog)
export class projects{

    @bindable dataProject;
    @bindable dataAssignment;
    dataTaskPerAccount;
    @bindable dataProjectPerAccount;
    @bindable date;
    @bindable efficiencyCount;

        

    constructor(router, dialog) {
        this.service = new RestService("core", "accounts");    
        this.router = router; 
        this.dialog = dialog;
        this.efficiencyCount = 0;
        this.accountId;
        this.date;
        
    }

    async activate(params){
        var id = params.id;
        this.accountId = id;
        this.data = await this.service.get(id, { filter: { include: "profile" } });

        

        this.assignmentService = new RestService("core", `accounts/${id}/assignments`);
        this.totalAssignment = new RestService("core", `accounts/${id}/count/closedAssignment`);


        // this.accountEfficiency = new RestService ("core", `accounts/${id}/count/efficiency`)
        // this.efficiency = await this.accountEfficiency.get();

       // this.viewAssignment = new RestService("core",`accounts/${id}/count/efficiency/${this.date}`);
        //this.viewAssignmentReport = await this.viewAssignment.get();
        
    }      

    columns = ["code", "name"];
    assignmentsColumns = ["status","budget","elapsed",
    {
        field: "date", 
        title: "date",
        formatter: function (value, row, index) {
        return value ? moment(value).format("DD-MMM-YYYY") : "-";
    }}, 
    "remark"];

     __dateFormatter = function (value, row, index) {
    return value ? moment(value).format("DD-MMM-YYYY") : "-";
    }

    taskColumns = [
    "code",
    "name",
    {
      field: "date", title: "date",
      formatter: this.__dateFormatter
    },
    "budget",
    "actual",
    {
      field: "open", title: "open",
      formatter: this.__dateFormatter
    },
    {
      field: "close", title: "close",
      formatter: this.__dateFormatter
    },
    "remark",
    "status"];


    assignmentLoader = (info) => {
    var fields = this.assignmentsColumns.map(col => {
      if (typeof col === "string")
        return col;
      else if (typeof col === "object" && col.field)
        return col.field;
    })
    var loopbackFilter = createLoopbackFilterObject(info, fields)

    return Promise
      .all([this.assignmentService.count(loopbackFilter.filter), this.assignmentService.list(loopbackFilter)])
      .then(results => {
        var count = results[0].count;
        var data = results[1];

        this.getEfficiency();
        return {
          total: count,
          data: data
        };
      });
    };


  getEfficiency(){
    console.log("wake up");
    // this.efficiencyCount = this.efficiency.efficiency;
    // console.log(this.efficiency.efficiency);
    // console.log("wake up")
    // return this.accountEfficiency.get();
  }

  // changeCallback(){
  //   var date = this.date;
  //   var arg = arg.data;

  // }

  // viewReportAssignment(){
  //   var date = this.date;
  //   console.log();
  //   viewAssignment;
  //   console.log("lihat assignment");
  //   this.assignmentTable.refresh();

  // }

  // async getEfficiencyByDate(date){
  //   this.accountEfficiencyByDate = new RestService ("core", `accounts/${id}/count/efficiency/${date}`)
  //   this.efficiencyByDate = await this.accountEfficiencyByDate.get();
  // }

  changeCallback($event) {
    console.log(this.date)
    this.getEfficiencyByDate(this.date)
  }


}