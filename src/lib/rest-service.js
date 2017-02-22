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

  _parseResult(result) {
    if (result.error) {
      return Promise.reject(result.error);
    }
    else {
      return Promise.resolve(result.data)
    }
  }

  list(info) {
    var _info = Object.assign({}, info);
    delete _info.order;
    var promise = this.endpoint.find(this.resource, _info);
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then((result) => {
        this._publish(promise);
        return Promise.resolve(result);
      });
  }

  get(id) {
    var promise = this.endpoint.find(`${this.resource}\\${id}`)
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then((result) => {
        this._publish(promise);
        return this._parseResult(result);
      });
  }

  post(data) {
    var promise = this.endpoint.post(this.resource, data);
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this._publish(promise);
        if (result)
          return this._parseResult(result);
        else
          return Promise.resolve({});
      })
  }

  put(data) {
    var promise = this.endpoint.update(this.resource, null, data);
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this._publish(promise);
        if (result)
          return this._parseResult(result);
        else
          return Promise.resolve({});
      })
  }

  delete(id) {
    var promise = this.endpoint.destroy(`${this.resource}\\${id}`);
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this._publish(promise);
        if (result)
          return this._parseResult(result);
        else
          return Promise.resolve({});
      })
  }
}
