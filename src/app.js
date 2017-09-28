/* @flow */

import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  constructor() {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Sbox';
    config.map([
      {route: ['', 'inbox'], name: 'inbox', moduleId: './inbox/inbox', nav: true,  title: 'Inbox'},
      {route: ['sent'], name: 'sent', moduleId: './sent/sent', nav: true, title: 'Sent'},
      {route: ['login'], name: 'login', moduleId: './login/login', nav: false, title: 'Login'}
    ]);
    this.router = router;
  }
}
