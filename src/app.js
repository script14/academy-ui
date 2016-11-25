import {AuthenticateStep} from 'aurelia-authentication';

export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
  config.addPipelineStep('authorize', AuthenticateStep);

    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users'},
      { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      { route: 'products',      name: 'product',      moduleId: './product',      nav: true, title: 'Products', auth:true},
      { route: 'login',                               moduleId: './login',        nav: true, title: 'Login' },
    ]);

    this.router = router;
  }
}

// var arr = []

// for(var item of list)
// {
//   p = new Promise(()=>{
//       var p1 = getc1();
//       var p2 = getc2();

//       Promise.all([p1,p2])
//       .then(results=>{
//         var c1 = resulst[0]
//         var c2 = resulst[1]
//         resolve({i:item, c1:c1, c2:c2})''
//       })

//       arr.push(p);


//   })
// }

// Promise.all(arr)
// .then(results=>{
//   for(var i of result)
//   {
//       item = i.item;
//   }

// })

