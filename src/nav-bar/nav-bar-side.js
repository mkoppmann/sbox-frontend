/* @flow */

import {bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

export class NavBarSide {
  hidden: boolean;
  @bindable router: Router;

  constructor() {
    this.hidden = true;
  }

  toggleSidebar(): void {
    this.hidden = !this.hidden;
  }
}
