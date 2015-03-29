import {AzureClient} from './plugins/azure-client';
import {EventAggregator} from 'aurelia-event-aggregator';
export class Characters {
  static inject() {return [AzureClient, EventAggregator];}
  constructor(provider, events) {
    this.provider = provider;
    this.characters = [];
    this.loggedIn = this.provider.auth();
    this.showSearch = !this.provider.auth();
    this.showNoAccountSearch = false;
    var loginHandler = (payload) => {
      this.loggedIn = this.provider.auth();
      this.showSearch = !this.loggedIn;
      this.getUserData();
    };

    var logoutHandler = () => {
      this.loggedIn = false;
      this.showSearch = true;
      this.characters = [];
    }

    var searchHandler = (term) => {
      this.search(term);
    };

    var getUserData = () => {
      this.getUserData();
    }

    events.subscribe('search', searchHandler);
    events.subscribe('login', loginHandler);
    events.subscribe('logout', logoutHandler);
    events.subscribe('refreshUser', getUserData);
  }

  getUserData() {
    this.provider.fetchUserData().then(response => {
      this.processResults(response, false);
    });
  }

  activate() {
    this.characters = [];
    if(this.loggedIn) {
      this.getUserData();
    }
  }

  processResults(response, showAdd) {
    var characters = response.result || response; //until i get a steady result from azure
    var loggedIn = this.loggedIn;
    var provider = this.provider;
    characters.forEach(function(character) {
      var missions, missionsArray = [];
      missions = JSON.parse(character.missions);
      for(var mission in missions) {
        missionsArray.push(missions[mission]);
      }
      character.missions = missionsArray;
      character.showAdd = showAdd;
      character.add = function() {
        provider.add({character: this.id}).then(function(result){
          console.log(result);
        });
      };
    });
    this.characters = characters;
    this.showNoAccountSearch = !this.showSearch && this.characters.length === 0;
  }

  search(term) {
    this.showSearch = false;
    return this.provider.fetch(term).then(response => {
      var characters = response.result || response; //until i get a steady result from azure
      var loggedIn = this.loggedIn;
      var provider = this.provider;
      characters.forEach(function(character) {
        var missions, missionsArray = [];
        missions = JSON.parse(character.missions);
        for(var mission in missions) {
          missionsArray.push(missions[mission]);
        }
        character.missions = missionsArray;
        character.showAdd = loggedIn;
        character.add = function() {
          provider.add({character: this.id}).then(function(result){
            console.log(result);
          });
        };
      });
      this.characters = characters;
      this.showNoAccountSearch = !this.showSearch && this.characters.length === 0;
    });
  }
}
