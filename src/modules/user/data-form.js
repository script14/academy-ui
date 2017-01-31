import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DataForm {
  @bindable readOnly = false;
  @bindable data;
  @bindable error;

  @bindable title;

  @bindable cancel;
  @bindable delete;
  @bindable save;
  @bindable edit;

  roleColumns = [
    { header: "Code", value: "code" },
    { header: "Name", value: "name" },
    { header: "Description", value: "description" },
  ]
  get roleLoader() {
    return (start) => {
      const resource = 'roles';
      var config = Container.instance.get(Config);
      var endpoint = config.getEndpoint("auth");
      return endpoint.find(resource)
        .then(results => {
          return results.data.map(role => {
            // role.toString = function () {
            //   return [this.code, this.name]
            //     .filter((item, index) => {
            //       return item && item.toString().trim().length > 0;
            //     }).join(" - ");
            // }
            return role;
          })
        });
    };
    // return (start) => fetch("https://api.github.com/users")
    //   .then(response => response.json())
  }

  roleSelected(event) {
    var role = event.detail;
    this.data.roles.push(role)
  }

  get addRole() {
    return (event) => console.log(event);
  }

  get removeRole() {
    return (event) => console.log(event);
  }
} 
