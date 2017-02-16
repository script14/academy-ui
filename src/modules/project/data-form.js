import { bindable } from "aurelia-framework";

export class DataForm {
  @bindable data;
  @bindable error;

  @bindable submit;
  @bindable cancel;

  collectionHeaders = ["Id", "Name", "user"];

  dropdownItems = [{
    value: 1, text: "One"
  }, {
    value: 2, text: "Two"
  }, {
    value: 3, text: "Three"
  }, {
    value: 4, text: "Four"
  }]

  constructor() {
    this.dropdownItems.forEach(item => {
      item.toString = function () {
        return this.text;
      }.bind(item);
      return item;
    })
  }

  controlOptions = {
    control: {
      //  length: 0
    }
  }

  get dataLoader() {
    return (start) => fetch("https://api.github.com/users")
      .then(response => response.json())
  }

  valueChanged(event) {
    console.log(this.data);
  }

  addNewItem() {
    this.data.items.push({})
  }
  removeItem(event) {
    var item = event.detail;
    console.log(item);
  }
  select(event) {
    var item = event.detail;
    this.data.items.push({
      user: item
    })
  }
}
