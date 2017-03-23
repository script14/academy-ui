import { bindable, inject } from "aurelia-framework";
import { RestService } from "../../lib/rest-service";
import { Router } from 'aurelia-router';
import parseLoopbackError from "../../lib/loopback-error-parser";
import createLoopbackFilterObject from "../../lib/loopback-filter-factory";
import moment from "moment";

export class Index {

    async activate() {

    }

    configureRouter(config, router) {
        config.map([
            { route: '/', name: 'manage', nav: false, viewPorts: { backlogs: { moduleId: "./partials/backlogs" }, iterations: { moduleId: "./partials/iterations" } } }
        ]);
        this.router = router;
    }
}