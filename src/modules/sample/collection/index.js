import { bindable, computedFrom } from "aurelia-framework";

export class Index {
  // columns = [
  //   { header: "id", value: "id" },
  //   { header: "name", value: "name" },
  //   { header: "age", value: "age" },
  //   { header: "email", value: "email" }
  // ];

  columns = ["name", "age", "email"];

  people = [
    { id: 1, name: "Alice Ecila", age: 27, email: "alice.ecila@live.com" },
    { id: 2, name: "Beatrix Xirtaeb", age: 26, email: "beatrix.xirtaeb@facebook.com" },
    { id: 3, name: "Clara Aralc", age: 29, email: "clara.aralc@google.com" },
    { id: 4, name: "Donna Annod", age: 28, email: "donna.annod@twitter.com" }];
}
