import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

import { Config } from "aurelia-api";
import { Container } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';

export class RestService {

  constructor(endpoint, resource) {
    var config = Container.instance.get(Config);
    this.endpoint = config.getEndpoint(endpoint);
    this.eventAggregator = Container.instance.get(EventAggregator);
    this.resource = resource;
  }

  _publish(promise) {
    this.eventAggregator.publish('httpRequest', promise);
  }
  
  count(filter) {
    var __filter = Object.assign({}, filter);
    var promise = this.endpoint.find(`${this.resource}/count`, __filter);
    this._publish(promise);
    return promise
      .then((result) => {
        this._publish(promise);
        return Promise.resolve(result);
      })
      .catch(e => {
        this._publish(promise);
        throw e;
      })
  }

  list(filter) {
    var __filter = Object.assign({}, filter);
    var promise = this.endpoint.find(this.resource, __filter);
    this._publish(promise);
    return promise
      .then((result) => {
        this._publish(promise);
        return Promise.resolve(result);
      })
      .catch(e => {
        this._publish(promise);
        throw e;
      })
  }

  get(id, filter) {
    var promise = this.endpoint.findOne(this.resource, id, filter);
    this._publish(promise);
    return promise
      .then((result) => {
        this._publish(promise);
        console.log("get:completed")
        return Promise.resolve(result);
      })
      .catch(e => {
        this._publish(promise);
        throw e;
      });
  }

  post(data, resource) {
    var promise = this.endpoint.post(resource || this.resource, data);
    this._publish(promise);
    return promise
      .then(result => {
        this._publish(promise);
        if (result)
          return Promise.resolve(result);
        else
          return Promise.resolve({});
      })
      .catch(e => {
        this._publish(promise);
        throw e;
      })
  }

  put(id, data) {
    var promise = this.endpoint.update(this.resource, id, data, null);
    this._publish(promise);
    return promise
      .then(result => {
        this._publish(promise);
        if (result)
          return Promise.resolve(result);
        else
          return Promise.resolve({});
      })
      .catch(e => {
        this._publish(promise);
        throw e;
      })
  }

  delete(id) {
    var promise = this.endpoint.destroy(this.resource, id);
    this._publish(promise);
    return promise
      .then(result => {
        this._publish(promise);
        if (result)
          return Promise.resolve(result);
        else
          return Promise.resolve({});
      })
      .catch(e => {
        this._publish(promise);
        throw e;
      })
  }
}
