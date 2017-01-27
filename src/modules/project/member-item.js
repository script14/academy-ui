export class MemberItem {
  activate(data) {
    this.data = data;
  }

  get dataLoader() {
    return (start) => fetch("https://api.github.com/users")
      .then(response => response.json())
  }

  bind(ctx) {
    this.ctx = ctx;    
  }

  select(event) {
    this.data = event.detail;
    console.log(this.data)
  }
}
