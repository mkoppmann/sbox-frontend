/* @flow */

import {Aurelia, inject} from 'aurelia-framework';
import HttpService from '../services/http-service';
import User from '../models/user';

@inject(Aurelia)
export default class AuthService {
  httpClient: HttpService;
  app: Aurelia;
  session: boolean;
  user: ?User;

  constructor(aurelia: Aurelia) {
    this.httpClient = new HttpService();
    this.app = aurelia;
    this.session = false;
  }

  login(username: string, password: string): Promise<any> {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return new Promise((resolve, reject) => {
      this.httpClient
        .postRequest('user/login', formData)
        .then((response) => {
          if (response.ok) {
            this.session = true;
            this.app.setRoot('app');
            resolve(true);
          } else {
            const error = new Error('Login failed');
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  logout(): void {
    this.httpClient.postRequest('user/logout', '');
    this.session = false;
    this.user = null;
    this.app.setRoot('login/login');
  }

  isAuthenticated(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .getRequest('hello')
        .then((response) => {
          if (response.ok) {
            this.session = true;
            resolve('You are logged in');
          } else {
            const error = new Error('You are not logged in');
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getAndSetUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .getRequest('user/me')
        .then((response) => response.json())
        .then((data) => {
          this.user = new User(data);
          resolve(this.user);
        })
        .catch((reason) => {
          let error = new Error();
          error.message = reason;
          reject(error);
        });
    });
  }
}
