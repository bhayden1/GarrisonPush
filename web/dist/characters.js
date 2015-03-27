System.register(["./plugins/azure-client", "aurelia-event-aggregator"], function (_export) {
  var AzureClient, EventAggregator, _createClass, _classCallCheck, Characters;

  return {
    setters: [function (_pluginsAzureClient) {
      AzureClient = _pluginsAzureClient.AzureClient;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      Characters = _export("Characters", (function () {
        function Characters(provider, events) {
          var _this = this;

          _classCallCheck(this, Characters);

          this.provider = provider;
          this.characters = [];
          this.loggedIn = false;
          this.showSearch = true;
          this.showNoAccountSearch = false;
          var loginHandler = function (payload) {
            _this.loggedIn = _this.provider.auth();
            _this.showSearch = !_this.loggedIn;
            _this.getUserData();
          };

          var logoutHandler = function () {
            _this.loggedIn = false;
            _this.showSearch = true;
            _this.characters = [];
          };

          var searchHandler = function (term) {
            _this.search(term);
          };

          var getUserData = function () {
            _this.getUserData();
          };

          events.subscribe("search", searchHandler);
          events.subscribe("login", loginHandler);
          events.subscribe("logout", logoutHandler);
          events.subscribe("refreshUser", getUserData);
        }

        _createClass(Characters, {
          getUserData: {
            value: function getUserData() {
              var _this = this;

              this.provider.fetchUserData().then(function (response) {
                _this.processResults(response, false);
              });
            }
          },
          activate: {
            value: function activate() {
              this.characters = [];
              if (this.loggedIn) {
                this.search("");
              }
            }
          },
          processResults: {
            value: function processResults(response, showAdd) {
              var characters = response.result || response; //until i get a steady result from azure
              var loggedIn = this.loggedIn;
              var provider = this.provider;
              characters.forEach(function (character) {
                var missions,
                    missionsArray = [];
                missions = JSON.parse(character.missions);
                for (var mission in missions) {
                  missionsArray.push(missions[mission]);
                }
                character.missions = missionsArray;
                character.showAdd = showAdd;
                character.add = function () {
                  provider.add({ character: this.id }).then(function (result) {
                    console.log(result);
                  });
                };
              });
              this.characters = characters;
              this.showNoAccountSearch = !this.showSearch && this.characters.length === 0;
            }
          },
          search: {
            value: function search(term) {
              var _this = this;

              this.showSearch = false;
              return this.provider.fetch(term).then(function (response) {
                var characters = response.result || response; //until i get a steady result from azure
                var loggedIn = _this.loggedIn;
                var provider = _this.provider;
                characters.forEach(function (character) {
                  var missions,
                      missionsArray = [];
                  missions = JSON.parse(character.missions);
                  for (var mission in missions) {
                    missionsArray.push(missions[mission]);
                  }
                  character.missions = missionsArray;
                  character.showAdd = loggedIn;
                  character.add = function () {
                    provider.add({ character: this.id }).then(function (result) {
                      console.log(result);
                    });
                  };
                });
                _this.characters = characters;
                _this.showNoAccountSearch = !_this.showSearch && _this.characters.length === 0;
              });
            }
          }
        }, {
          inject: {
            value: function inject() {
              return [AzureClient, EventAggregator];
            }
          }
        });

        return Characters;
      })());
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QzNCLGlDQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO21CQUN2QztBQUNELDJCQUFTLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztBQUNuQywyQkFBUyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFDN0IsMkJBQVMsQ0FBQyxHQUFHLEdBQUcsWUFBVztBQUN6Qiw0QkFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBUyxNQUFNLEVBQUM7QUFDdEQsNkJBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3JCLENBQUMsQ0FBQzttQkFDSixDQUFDO2lCQUNILENBQUMsQ0FBQztBQUNILHNCQUFLLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDN0Isc0JBQUssbUJBQW1CLEdBQUcsQ0FBQyxNQUFLLFVBQVUsSUFBSSxNQUFLLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO2VBQzdFLENBQUMsQ0FBQzthQUNKOzs7QUEzRk0sZ0JBQU07bUJBQUEsa0JBQUc7QUFBQyxxQkFBTyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUFDOzs7O2VBRDdDLFVBQVUiLCJmaWxlIjoiY2hhcmFjdGVycy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjLyJ9