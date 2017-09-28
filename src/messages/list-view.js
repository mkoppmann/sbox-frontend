/* @flow */

import {bindable, bindingMode, inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import HttpService from '../services/http-service';
import {CreateMessageController} from '../messages/create-message-controller';
import Message from '../models/message';
import AuthService from '../services/auth-service';

@inject(DialogService, AuthService)
export class ListView {
  @bindable({defaultBindingMode: bindingMode.twoWay}) message: Message;
  @bindable viewType: string;
  dialogService: DialogService;
  authService: AuthService;
  controller: CreateMessageController;
  messages: Message[];
  httpClient: HttpService;

  constructor(dialogService: DialogService, authService: AuthService) {
    this.httpClient = new HttpService();
    this.dialogService = dialogService;
    this.authService = authService;
    this.controller = new CreateMessageController(dialogService);
    this.messages = [];
    this.reloadMessages()
      .then((reloaded) => {
        this.message = this.messages[0];
        this.messages[0].isActive = true;
      });
  }

  fetchMessages(): Promise<boolean> {
    return new Promise((resolve) => {
      this.messages = [];
      this.httpClient.getRequest('messages')
        .then((response) => response.json())
        .then((data) => {
          data.map((messageResponse) => {
            let message = new Message(messageResponse);
            this.messages.push(message);
          });
          resolve(true);
        });
    });
  }

  filterMessages(): Promise<boolean> {
    return new Promise((resolve) => {
      let inboxList = [];
      let sentList = [];
      this.messages.filter((message) => {
        message.recipients.map((recipient) => {
          if (message.sender.id === this.authService.user.id && recipient.id === this.authService.user.id) {
            inboxList.push(message);
            sentList.push(message);
          } else if (message.sender.id === this.authService.user.id && recipient.id !== this.authService.user.id) {
            sentList.push(message);
          } else {
            inboxList.push(message);
          }
        });
      });

      if (this.viewType === 'inbox') {
        this.messages = inboxList;
      } else if (this.viewType === 'sent') {
        this.messages = sentList;
      } else {
        this.messages = [];
      }

      resolve(true);
    });
  }

  reloadMessages(): Promise<boolean> {
    return new Promise((resolve) => {
      this.fetchMessages()
        .then((fetched) => {
          if (fetched) {
            this.filterMessages()
              .then((filtered) => {
                if (filtered) {
                  resolve(true);
                }
              });
          }
        });
    });
  }

  setActive(message: Message): void {
    this.message = message;
    this.messages.map((element) => {
      element.isActive = false;
    });
    message.isActive = !message.isActive;
  }
}
