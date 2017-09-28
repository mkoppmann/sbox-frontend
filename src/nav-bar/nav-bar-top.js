/* @flow */

import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import AuthService from '../services/auth-service';
import {CreateMessageController} from '../messages/create-message-controller';

@inject(AuthService, DialogService)
export class NavBarTop {
  authService: AuthService;
  dialogService: DialogService;
  controller: CreateMessageController;
  username: string;

  constructor(authService: AuthService, dialogService: DialogService) {
    this.authService = authService;
    this.dialogService = dialogService;
    this.controller = new CreateMessageController(dialogService);

    this.authService.getAndSetUser()
      .then((user) => {
        this.username = user.name;
      });

    if (this.username === undefined) {
      this.username = 'Username';
    }
  }

  navBarLogout(): void {
    this.authService.logout();
  }
}
