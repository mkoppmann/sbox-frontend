/* @flow */

import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {CreateMessageDialog} from '../messages/create-message-dialog';
import HttpService from '../services/http-service';

export class CreateMessageController {
  dialogService: DialogService;
  httpClient: HttpService;
  message: Object;

  constructor(dialogService: DialogService) {
    this.dialogService = dialogService;
    this.httpClient = new HttpService();

    this.message = {
      recipients: [],
      subject: '',
      message: ''
    };
  }

  createMessage(): void {
    this.message = {
      recipients: [],
      subject: '',
      message: ''
    };

    this.dialogService.open({
      viewModel: CreateMessageDialog,
      model: this.message,
      lock: false,
      centerHorizontalOnly: true
    }).whenClosed((response) => {
      if (!response.wasCancelled) {
        this.httpClient.postJsonRequest('messages', this.message)
          .then((httpResponse) => httpResponse.json())
          .then((data) => {
            console.log(data);
          });
      } else {
        // Dialog was cancelled
      }
      console.log(response.output);
    });
  }
}
