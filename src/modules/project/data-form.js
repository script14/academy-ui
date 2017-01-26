import { bindable } from "aurelia-framework";

export class DataForm {
  @bindable data;
  @bindable error;

  collectionHeaders = ["Id","Name"];
  dropdownItems = [{
    value: 1,
    text: "One"
  }, {
    value: 2,
    text: "Two"
  }, {
    value: 3,
    text: "Three"
  }, {
    value: 4,
    text: "Four"
  }]

  constructor() {
    this.dropdownItems.forEach(item => {
      item.toString = function () {
        return this.text;
      }.bind(item);
      return item;
    })
  }
  dOptions = {
    label: {
      length: 2,
      align: "right"
    },
    control: {
      length: 3
    },
    value: "value",
    text: "text",
  }

  get dataLoader() {
    return (start) => fetch("https://api.github.com/users")
      .then(response => response.json())
    // .then(result => {
    //   return result.map(item => {
    //     item.toString = function () {
    //       return `${this.login}`;
    //     }
    //     return item;
    //   })
    // });
  }
  tChange() {
    console.log(this.data);
    console.log("tChange");
  }

  addNewItem() {
    this.data.items.push(
      { id: 4, name: "Four" }, )
  }
}
