import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { RestService } from "../../lib/rest-service";
import createLoopbackFilterObject from "../../lib/loopback-filter-factory";
import moment from "moment";

@inject(Router)
export class List {
  constructor(router) {
    this.service = new RestService("core", "tasks");
    this.router = router;
  }
  __dateFormatter = function (value, row, index) {
    return value ? moment(value).format("DD-MMM-YYYY") : "-";
  }

  columns = [
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
  contextMenu = ["Detail","Assignment(s)"];

  loader = (info) => {
    var fields = this.columns.map(col => {
      if (typeof col === "string")
        return col;
      else if (typeof col === "object" && col.field)
        return col.field;
    })

    var loopbackFilter = createLoopbackFilterObject(info, fields)
    return Promise
      .all([this.service.count(loopbackFilter.filter), this.service.list(loopbackFilter)])
      .then(results => {
        var count = results[0].count;
        var data = results[1];
        return {
          total: count,
          data: data
        };
      });
  };

  __view(id) {
    this.router.navigateToRoute('view', { id: id });
  }

  viewEmployee(id){
    this.router.navigateToRoute('employee',{ id: id });
  }

  create() {
    this.router.navigateToRoute('create');
  }

  __contextMenuCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.__view(data.id);
        break;
      case "Assignment(s)":
        this.viewEmployee(data.id);
        break;  
    }
  }
}
