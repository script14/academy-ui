import { bindable, containerless, computedFrom } from "aurelia-framework";
import { RestService } from "../../lib/rest-service";
import createLoopbackFilterObject from "../../lib/loopback-filter-factory";

@containerless()
export class DataForm {
  @bindable title;
  @bindable readOnly;


  @bindable selectedIteration = {};// required. for initial variable reference.
  @bindable selectedTask = {};// required. for initial variable reference.
  @bindable selectedAccount = {};// required. for initial variable reference.

  constructor() {
    this.accountService = new RestService("core", "accounts");
    this.iterationService = new RestService("core", "iterations");
    this.taskService = new RestService("core", "tasks");
    this.projectService = new RestService("core", "projects");
    this.backlogService = new RestService("core", "backlogs");
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    var iterationId = this.data.iterationId;
    var accountId = this.data.accountId;
    var taskId = this.data.taskId;

    this.selectedIteration = await this.iterationService.get(iterationId, { filter: { include: "project" } });
    this.selectedAccount = await this.accountService.get(accountId);
    this.selectedTask = await this.taskService.get(taskId, { filter: { include: ["project", "backlog"] } });
  }

  selectedIterationChanged(newValue, oldValue) {
    this.data.iterationId = this.selectedIteration ? this.selectedIteration.id : this.data.iterationId;
  }

  selectedAccountChanged(newValue, oldValue) {
    this.data.accountId = this.selectedAccount ? this.selectedAccount.id : this.data.accountId;
  }

  selectedTaskChanged(newValue, oldValue) {
    this.data.taskId = this.selectedTask ? this.selectedTask.id : this.data.taskId;
  }

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || '').toString() !== '';
  }

  get taskLoader() {
    return (keyword) => {
      var info = { search: keyword };
      var loopbackFilter = createLoopbackFilterObject(info, ["code", "name"]);
      loopbackFilter.filter.include = ["project", "tasks"]
      return this.backlogService
        .list(loopbackFilter)
        .then(backlogs => {
          var projected = backlogs.map(backlog => {
            var tasks = backlog.tasks.map(task => {
              task.project = backlog.project;
              task.backlog = backlog;
              return task;
            })
            return tasks;
          });

          projected = Array.prototype.concat.apply([], projected);
          return projected;
        });
    }
  }
  
  get iterationLoader() {
    return (keyword) => {
      var info = { search: keyword };
      var loopbackFilter = createLoopbackFilterObject(info, ["code", "name"]);
      loopbackFilter.filter.include = {
        relation: "iterations"
      }
      return this.projectService
        .list(loopbackFilter)
        .then(projects => {
          var projected = projects.map(project => {
            var iterations = project.iterations.map(iteration => {
              iteration.project = project;
              return iteration;
            })
            return iterations;
          });

          projected = Array.prototype.concat.apply([], projected);
          return projected;
        });
    }
  }
  get accountLoader() {
    return (keyword) => {
      var info = { search: keyword };
      var loopbackFilter = createLoopbackFilterObject(info, ["username", "email"])
      return this.accountService.list(loopbackFilter)
    }
  }

  iterationFormatter(iteration) {
    if (!iteration || !iteration.project)
      return '';
    return `${iteration.project.name}/iteration:${iteration.no}`
  }
  taskFormatter(task) {
    if (!task || !task.backlog || !task.project)
      return '';
    return `${task.project.name}/${task.backlog.name}/task: ${task.name}`
  }
}
