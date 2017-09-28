/* @flow */
import User from '../models/user';

export default class Message {
  isActive: boolean;
  id: string;
  date: Date;
  sender: User;
  recipients: User[];
  subject: string;
  message: string;

  constructor(message: Message) {
    this.isActive = false;
    this.id = message.id;
    this.date = new Date(message.date);
    this.sender = new User(message.sender);
    this.recipients = message.recipients;
    this.subject = message.subject;
    this.message = message.message;
  }
}
