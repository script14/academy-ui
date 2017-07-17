import { bindable, inject } from "aurelia-framework";
import { RestService } from "../../../lib/rest-service";
import { Router } from 'aurelia-router';
import { Dialog } from '../../../au-components/dialog/dialog';
import parseLoopbackError from "../../../lib/loopback-error-parser";
import createLoopbackFilterObject from "../../../lib/loopback-filter-factory";
import moment from "moment";


@inject(Router, Dialog)
export class reports{
  @bindable activeIteration;
  @bindable activeAssignment;
  @bindable arrayData;
  @bindable arrayUserData;
  
  array_data;
  @bindable efisiensi;


    total;    
    sumElapsed = 0;
    sumBudget = 0;

    constructor(router, dialog) {
        this.service = new RestService("core", "accounts");
        this.iterationService = new RestService("core", "iterations");
        this.router = router; 
        this.dialog = dialog;
        this.arrayData;
        this.arrayUserData;
        this.array_data;
    }

    async activate(params){
        var id = params.id;
        //this.assignmentService = new RestService("core", `accounts/${id}/assignments`);
        this.data = await this.service.get(id, { filter: { include: "profile" } });
    }
    
    activeIterationChanged(newValue, oldValue) {
      this.assignmentService = new RestService("core", `iterations/${this.activeIteration.id}/assignments`);
      this.taskService = new RestService("core", `accounts/${this.data.id}/assignments`);
      this.assignmentTable.refresh();
    }   

    iterationColumns = ["no",
    {
      field: "start", title: "date",
      formatter: function (value, row, index) {
        return value ? moment(value).format("DD-MMM-YYYY") : "-";
      }
    },
    {
      field: "end", title: "date",
      formatter: function (value, row, index) {
        return value ? moment(value).format("DD-MMM-YYYY") : "-";
      }
    }, "remark"];


    __iterationRowClickCallback(event) {
      var data = event.detail;
      this.activeIteration = data;

    }

    iterationLoader = (info) => {
      var fields = this.iterationColumns.map(col => {
        if (typeof col === "string")
          return col;
        else if (typeof col === "object" && col.field)
          return col.field;
      })
      var loopbackFilter = createLoopbackFilterObject(info, fields)
      return Promise
        .all([this.iterationService.count(loopbackFilter.filter), this.iterationService.list(loopbackFilter)])
        .then(results => {
          var count = results[0].count;
          var data = results[1];
          return {
            total: count,
            data: data
          };
        });
    };

  

    columns = ["status","budget","elapsed",
    {
        field: "date", 
        title: "date",
        formatter: function (value, row, index) {
        return value ? moment(value).format("DD-MMM-YYYY") : "-";
    }}, 
    "remark"];

    assignmentLoader = (info) => {
      if (!this.activeIteration)
        return Promise.resolve({ total: 0, data: [] });
      else{
        var fields = this.columns.map(col => {
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
          this.arrayData = results[1];
          this.total= count;

          this.userAssignmentTable.refresh();
          this.userIterationAssignmentTable.refresh();
          return {
            total: count,
            data: data
          };
        });     
      }  
    }

    userAssignmentLoader = (info) => {
      if (!this.activeIteration)
        return Promise.resolve({ total: 0, data: [] });
      else{
        var fields = this.columns.map(col => {
        if (typeof col === "string")
          return col;
        else if (typeof col === "object" && col.field)
          return col.field;
      })
      var loopbackFilter = createLoopbackFilterObject(info, fields)
      return Promise
        .all([this.taskService.count(loopbackFilter.filter), this.taskService.list(loopbackFilter)])
        .then(results => {
          var count = results[0].count;
          var data = results[1];

          //array of JSON 'result[0]' dipanggil, dan disimpan dalam arrauUserData
          this.arrayUserData = results[1];
          this.total= count;          
          
          //memanggil method refresh tabel userIterationAssignmentTable
          this.userIterationAssignmentTable.refresh();
          return {
            total: count,
            data: data
          };
        });     
      }  
    }

    userIterationAssignmentLoader = (info) => {
      if (!this.activeIteration)
        return Promise.resolve({ total: 0, data: [] });
      else{
        var fields = this.columns.map(col => {
        if (typeof col === "string")
          return col;
        else if (typeof col === "object" && col.field)
          return col.field;
      })
      var loopbackFilter = createLoopbackFilterObject(info, fields)
      return Promise
        .all([this.arrayData, this.arrayUserData])
        .then(results => {
            var data_a = results[0];  
            console.log("data_a dipanggil")
            console.log(data_a);
            var data_b = results[1];
            console.log("data_b dipanggil")
            console.log(data_b);
            
            for(var i = 0; i < data_a.length; i++) {
              for(var j = 0; j < data_b.length; j++) {  
                  var obj_a = data_a[i];
                  var obj_b = data_b[j];
                  console.log(obj_a.id);
                  console.log(obj_b.id);
                  if(data_a[i]=data_b[j]){
                    this.array_data = data_b;
                    this.arrayData = 0;
                    this.arrayUserData = 0;
                  }
              }
            }
          return {
            data: this.array_data
          };

        });     
      }  
    }

  calculateSum() {
    let sumElapsed = 0;
    let sumBudget = 0;
    for (let item of this.array_data) {
      sumElapsed = sumElapsed + parseFloat(item.elapsed);
      sumBudget  = sumBudget + parseFloat(item.budget);
    }
    this.sumElapsed = sumElapsed;
    this.sumBudget = sumBudget;
    this.efisiensi = parseFloat(this.sumElapsed)/this.sumBudget;
    this.efisiensi = this.efisiensi*100;
  }
}