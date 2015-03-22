import {HttpClient} from 'aurelia-http-client';

export class Characters {
  static inject() {return [CharactersResource];}
  constructor(resource) {
    this.resource = resource;
    this.characters = [];
  }

  activate() {
    return this.resource.get().then(response => {
      response.content.forEach(function(character) {
        var missions, missionsArray = [];
        missions = JSON.parse(character.missions);
        console.log(missions);
        for(var mission in missions) {
          missionsArray.push(missions[mission]);
        }
        character.missions = missionsArray;
      });
      this.characters = response.content;
    });
  }
}

class Character {
  constructor() {
    this.realm = ''
    this.character = ''
    this.missions = [];
    this.id = '';
    this.uuid = '';
  }
}

class CharactersResource {
  static inject() {return [HttpClient];}
  constructor(http) {
    this.http = http;
    this.http.requestTransformers.push(function(http, processor, message) {
      message.headers.add('Content-Type', 'application/json');
      message.headers.add('X-ZUMO-APPLICATION', 'UUVbarwJGSIulkKJoNuuYfXBTHPtpD58');
      message.headers.add('X-ZUMO-INSTALLATION-ID', '67390b1f-5db8-981f-f11a-df05747aa5c7');
      message.headers.add('X-ZUMO-VERSION', 'ZUMO/1.2 (lang=Web; os=--; os_version=--; arch=--; version=1.2.21003.0)')
    });
  }

  get() {
    return this.http.get('https://gpservice.azure-mobile.net/tables/test');
  }
}
