export class ListItem
{
    selections = ["A", "B","C"];
    objects = [{id:1, value:"A"}, {id:2, value:"B"},{id:3, value:"C"}];
    activate(context)
    {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        console.log(this.data);
    }
}