export class Tasks {
  tasks = [];
  activate(model) {
    console.log("model.datas");
    console.log(model.datas);
    if(model.datas) this.tasks = model.datas;    
  }
}