export class Characters {
  static inject(return[CharactersResource])
  constructor(resource) {
    this.resource = resource;
    this.characters = [];
  }
}

export class Character {
  constructor() {
    this.realm = ''
    this.character = ''
    this.missions = [];
    this.id = '';
    this.uuid = '';
  }
}

export class CharactersResource {
  static inject(return [HttpClient];)
  constructor(http) {
    this.http = http;
    http.defaultRequestHeaders['X-ZUMO-APPLICATION'] ='UUVbarwJGSIulkKJoNuuYfXBTHPtpD58';
    http.defaultRequestHeaders['X-ZUMO-INSTALLATION-ID'] = '67390b1f-5db8-981f-f11a-df05747aa5c7';
    http.defaultRequestHeaders['X-ZUMO-VERSION'] = 'ZUMO/1.2 (lang=Web; os=--; os_version=--; arch=--; version=1.2.21003.0)';
    };
  }
}
