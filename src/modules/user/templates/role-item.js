export class RoleItem {
  activate(context) {
    this.role = context.data;
    this.error = context.error;
  } 
}
