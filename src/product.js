import { inject, useView } from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication'; 
import { Config } from 'aurelia-api'; 

@inject(AuthService, Config) 
export class Product {
    heading = 'Customer management with custom http service';
    products = [];

    url = 'https://dl-core-api-dev.mybluemix.net/v1/master/products';

    constructor(http, config) {
        this.http = http;
        this.c = config;
    }

    activate() {
        console.log(this.c);
        console.log(this.http.config);
        console.log(this.http.client);
        console.log(this.http.client.client);

        var ep = this.c.getEndpoint("master");
        console.log(ep);

        return ep.find("products").then(result=>{
            this.products = result.data
        });

        // return this.http.client.client.fetch(this.url)
        //     .then(response => response.json())
        //     .then(c => this.products = c.data);
    }

}