/* @flow */

import {bindable} from 'aurelia-framework';
import HttpService from '../services/http-service';
import Message from '../models/message';

export class DetailView {
  httpClient: HttpService;
  @bindable message: Message;

  constructor() {
    this.httpClient = new HttpService();
  }

  deleteMessage(): void {
    this.httpClient
      .deleteRequest(`messages/${this.message.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}
