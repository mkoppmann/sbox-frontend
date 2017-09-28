/* @flow */

import Aurelia from 'aurelia-framework';
import AuthService from './services/auth-service';
import environment from './environment';
import 'whatwg-fetch';
import 'bootstrap';

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 5;
      config.settings.keyboard = true;
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => {
    const auth = aurelia.container.get(AuthService);
    auth.isAuthenticated()
      .then((authenticated) => {
        aurelia.setRoot();
      })
      .catch((reason) => {
        aurelia.setRoot('login/login');
      });
  });
}
