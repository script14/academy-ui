import { bindable, containerless, computedFrom } from "aurelia-framework";
import { RestService } from "../../lib/rest-service";
import createLoopbackFilterObject from "../../lib/loopback-filter-factory";

@containerless()
export class DataForm {
  @bindable title;
  @bindable readOnly;


  @bindable selectedProject = {};// required. for initial variable reference.

  constructor() {
    this.projectService = new RestService("core", "projects");
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    var projectId = this.data.projectId;
    this.selectedProject = await this.projectService.get(projectId);
  }

  selectedProjectChanged(newValue, oldValue) {
    this.data.projectId = this.selectedProject.id;
  }

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || '').toString() !== '';
  }

  get projectLoader() {
    return (keyword) => {
      var info = { search: keyword };
      var loopbackFilter = createLoopbackFilterObject(info, ["code", "name"])
      return this.projectService.list(loopbackFilter)
    }
  }
}
