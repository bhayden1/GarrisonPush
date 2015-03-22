System.register(["aurelia-http-client"], function (_export) {
  var HttpClient, _createClass, _classCallCheck, Characters, Character, CharactersResource;

  return {
    setters: [function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      Characters = _export("Characters", (function () {
        function Characters(resource) {
          _classCallCheck(this, Characters);

          this.resource = resource;
          this.characters = [];
        }

        _createClass(Characters, {
          activate: {
            value: function activate() {
              var _this = this;

              return this.resource.get().then(function (response) {
                response.content.forEach(function (character) {
                  var missions,
                      missionsArray = [];
                  missions = JSON.parse(character.missions);
                  console.log(missions);
                  for (var mission in missions) {
                    missionsArray.push(missions[mission]);
                  }
                  character.missions = missionsArray;
                });
                _this.characters = response.content;
              });
            }
          }
        }, {
          inject: {
            value: function inject() {
              return [CharactersResource];
            }
          }
        });

        return Characters;
      })());

      Character = function Character() {
        _classCallCheck(this, Character);

        this.realm = "";
        this.character = "";
        this.missions = [];
        this.id = "";
        this.uuid = "";
      };

      CharactersResource = (function () {
        function CharactersResource(http) {
          _classCallCheck(this, CharactersResource);

          this.http = http;
          this.http.requestTransformers.push(function (http, processor, message) {
            message.headers.add("Content-Type", "application/json");
            message.headers.add("X-ZUMO-APPLICATION", "UUVbarwJGSIulkKJoNuuYfXBTHPtpD58");
            message.headers.add("X-ZUMO-INSTALLATION-ID", "67390b1f-5db8-981f-f11a-df05747aa5c7");
            message.headers.add("X-ZUMO-VERSION", "ZUMO/1.2 (lang=Web; os=--; os_version=--; arch=--; version=1.2.21003.0)");
          });
        }

        _createClass(CharactersResource, {
          get: {
            value: function get() {
              return this.http.get("https://gpservice.azure-mobile.net/tables/test");
            }
          }
        }, {
          inject: {
            value: function inject() {
              return [HttpClient];
            }
          }
        });

        return CharactersResource;
      })();
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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