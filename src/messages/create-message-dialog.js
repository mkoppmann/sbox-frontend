/* @flow */

import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import HttpService from '../services/http-service';
import Message from '../models/message';
import User from '../models/user';

@inject(DialogController)
export class CreateMessageDialog {
  dialogController: DialogController;
  httpClient: HttpService;
  message: Object;
  searchTerm: string;
  users: User[];
  recipients: ?User;

  constructor(dialogController: DialogController) {
    this.dialogController = dialogController;
    this.httpClient = new HttpService();
    this.users = [];
    this.recipients = null;
    this.searchTerm = '';
    this.getUsers();
  }

  getUsers(): void {
    this.httpClient
      .getRequest('user')
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
      });
  }

  findUserByNameOrEMail(): ?User {
    this.recipients = null;
    this.recipients = this.users.find((elem) => {
      return (elem.name.includes(this.searchTerm) || elem.email.includes(this.searchTerm));
    });
    console.log(this.recipients);
    this.message.recipients = [(this.recipients.id)];
  }

  fillInMailOfRecipient(): void {
    this.searchTerm = this.recipients.email;
  }

  activate(message: Object) {
    this.message = message;
  }
}
