/* @flow */

import Message from '../models/message';

export class Inbox {
  message: Message;
  viewType: string;

  constructor() {
    this.viewType = 'inbox';
  }
}
