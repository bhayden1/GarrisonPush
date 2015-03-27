import {Behavior} from 'aurelia-framework';
import {AzureClient} from './azure-client';
import {EventAggregator} from 'aurelia-event-aggregator';
//import {Characters} from '../Characters';

export class CharacterSearch {
  //static inject() {return [AzureClient, EventAggregator, Characters];}
  static inject() {return [AzureClient, EventAggregator];}
  static metadata(){
    return Behavior
      .customElement('search')
  }

  //constructor(provider, events, characters) {
    constructor(provider, events) {
    this.provider = provider;
    this.events = events;
    this.loggedIn = this.provider.auth();
    this.term = '';
    //this.characters = characters;
  }

  search() {
    console.log('search')
    this.events.publish('search', this.term);
    //this.characters.search(this.term);
  }

  changed(evt) {
    if(evt.which === 13) {
      console.log(evt.which);
      this.search();
    }
  }
}
