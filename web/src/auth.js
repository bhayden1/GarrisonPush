import {Behavior} from 'aurelia-framework';
import {AzureClient} from './plugins/azure-client';
import {EventAggregator} from 'aurelia-event-aggregator';
export class Auth {
  static inject() {return [AzureClient, EventAggregator];}
  static metadata(){
    return Behavior
      .customElement('auth')
  }

  constructor(provider, events) {
    this.provider = provider;
    this.events = events;
    this.loggedIn = this.provider.auth();
  }

  auth() {
    var handler = (result) => {
      this.events.publish('login', this.provider.currentUser());
      this.loggedIn = this.provider.auth();
    }
    this.provider.login().then(handler);
  }

  getUserData() {
    this.events.publish('refreshUser');
  }

  logout() {
    this.provider.logout();
    this.events.publish('logout', this.provider.currentUser());
    this.loggedIn = this.provider.auth();
  }
}
