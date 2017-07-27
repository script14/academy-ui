import { bindable, inject } from "aurelia-framework";
import { RestService } from "../../../lib/rest-service";
import { Router } from 'aurelia-router';
import { Dialog } from '../../../au-components/dialog/dialog';
import parseLoopbackError from "../../../lib/loopback-error-parser";
import createLoopbackFilterObject from "../../../lib/loopback-filter-factory";
import moment from "moment";

export class assignments {

  @bindable efficiencyData;
  @bindable countAssignments;

  @bindable loadStat;
  @bindable loadEffisiensi;
  @bindable dateRangeStat;

  @bindable startDate;
  @bindable endDate;
  
constructor() {
  this.countAssignments;
  this.efficiencyData =0 ;

  this.data=[];
  this.loadStat = null;//showing the botton after table loaded
  this.dateRangeStat =null;//date range input for filter table
  this.loadEffisiensi = null;

  this.startDate;
  this.endDate;

}

async activate(model) {
    this.data = model.datas;
    if(model.datas==null){
    }else{
      this.assignmentService = new RestService("core", `accounts/${this.data.accountId}/assignments`);
      this.assignmentsData = await this.assignmentService.get({ filter: { include: "task"}});

      this.assignmentTable.refresh();
    }
}
  assignmentsColumns = [
    {
        field: "status",
        title: "Status"
    },
    {
      field: "task.name",
      title: "Task Name"
    },
    {
      field: "task.type",
      title: "Task Type"
    },  
    {
        field: "budget",
        title: "Budget Time"
    },
    {
        field: "elapsed",
        title: "Elapsed Time"
    },
    {
        field: "date", 
        title: "Date",
        formatter: function (value, row, index) {
        return value ? moment(value).format("DD-MMM-YYYY") : "-";}
    },
    {
        field: "remark",
        title: "Remark"
    }];

    __dateFormatter = function (value, row, index) {
    return value ? moment(value).format("DD-MMM-YYYY") : "-";
    };

  assignmentLoader = (info) => {
    if(!this.assignmentsData) {
      return {
        data: []
      }
    }
    else {
    var fields = this.assignmentsColumns.map(col => {
      if (typeof col === "string")
        return col;
      else if (typeof col === "object" && col.field)
        return col.field;
    })
    var loopbackFilter = createLoopbackFilterObject(info, fields)
    return Promise
      .all([null,this.assignmentsData])
      .then(results => {
        var data = results[1];
        this.loadStat = 1 ;
        return {
          data: data
        };
      });
    }
  };

  showDateRange(){
    this.loadStat = null;
    this.dateRangeStat = 1;
  }

  async getEfficiencyByDate(){
      this.loadEffisiensi = 1 ;//memunculkan efisiensi berdasarkan tanggal
      this.efficiencyService = new RestService("core", `reports/account/${this.data.accountId}/${this.startDate}/to/${this.endDate}/efficiency`);     
      this.efficiencyData = await this.efficiencyService.get();
     
  }

  async getAssignmentByDate(){
      this.assignmentService = new RestService("core", `reports/account/${this.data.accountId}/${this.startDate}/to/${this.endDate}/assignments`);     
      this.assignmentsData = await this.assignmentService.get();

      this.getEfficiencyByDate();

      this.assignmentTable.refresh();

  }
}
