export class RoleItem {
  activate(context) {
    this.role = context.data;
    this.error = context.error;
    this.options = context.options;
    console.log(context)
  } 
}
