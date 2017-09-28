/* @flow */

import {HttpClient, json} from 'aurelia-fetch-client';
import 'whatwg-fetch';

export default class HttpService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
    this.httpClient.configure(config => {
      config
        .withBaseUrl('http://localhost:8000/api/')
        .withDefaults({
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }

  getRequest(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .fetch(url, {
          method: 'get'
        })
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          const error = new Error(`Got status code: ${response.status}`);
          reject(error);
        });
    });
  }

  postRequest(url: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .fetch(url, {
          method: 'post',
          body: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          const error = new Error(`Got status code: ${response.status}`);
          reject(error);
        });
    });
  }

  postJsonRequest(url: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .fetch(url, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: json(data)
        })
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          const error = new Error(`Got status code: ${response.status}`);
          reject(error);
        });
    });
  }

  deleteRequest(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .fetch(url, {
          method: 'delete'
        })
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          const error = new Error(`Got status code: ${response.status}`);
          reject(error);
        });
    });
  }
}
