/* @flow */

import {inject} from 'aurelia-framework';
import AuthService from '../services/auth-service';

@inject(AuthService)
export class App {
  authService: AuthService;
  message: string;
  serverResponse: string;
  username: string;
  password: string;
  errorLogin: boolean;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.message = 'Login';
    this.serverResponse = 'No answer yet';
    this.errorLogin = false;
  }

  loginCall(): void {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password)
        .then((successfullLogin) => {
          this.username = '';
          this.password = '';
          this.errorLogin = false;
        })
        .catch((reason) => {
          this.errorLogin = true;
        });
    } else {
      this.errorLogin = true;
    }
  }
}
