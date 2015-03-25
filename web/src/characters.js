import {AzureClient} from './plugins/azure-client';
import {EventAggregator} from 'aurelia-event-aggregator';
export class Characters {
  static inject() {return [AzureClient, EventAggregator];}
  constructor(provider, events) {
    this.provider = provider;
    this.characters = [];
    this.auth = false;
    var loginHandler = (payload) => {
      this.auth = this.provider.auth();
      this.activate();
    }
    events.subscribe('login', loginHandler);
  }

  activate() {
    if(!this.auth) {
      return;
    }
    return this.provider.fetch().then(response=> {
      response.result.forEach(function(character) {
        var missions, missionsArray = [];
        missions = JSON.parse(character.missions);
        for(var mission in missions) {
          missionsArray.push(missions[mission]);
        }
        character.missions = missionsArray;
      });
      this.characters = response.result;
    });
  }
}
