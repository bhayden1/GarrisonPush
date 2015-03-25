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
      console.log(result);
      console.log(this);
      this.events.publish('login', this.provider.currentUser());
      this.loggedIn = this.provider.auth();
    }
    this.provider.login().then(handler);
  }

  logout() {
    this.provider.logout();
    this.loggedIn = this.provider.auth();
  }
}
