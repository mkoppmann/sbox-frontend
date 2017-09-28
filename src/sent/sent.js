/* @flow */

import Message from '../models/message';

export class Sent {
  message: Message;
  viewType: string;

  constructor() {
    this.viewType = 'sent';
  }
}
