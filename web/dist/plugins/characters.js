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
          this.auth = false;
          var loginHandler = function (payload) {
            _this.auth = _this.provider.auth();
            _this.activate();
          };
          events.subscribe("login", loginHandler);
        }

        _createClass(Characters, {
          activate: {
            value: function activate() {
              if (!this.auth) {
                return;
              }
              /*return this.provider.fetch().then(response=> {
                response.result.forEach(function(character) {
                  var missions, missionsArray = [];
                  missions = JSON.parse(character.missions);
                  for(var mission in missions) {
                    missionsArray.push(missions[mission]);
                  }
                  character.missions = missionsArray;
                });
                this.characters = response.result;
              });*/
            }
          },
          search: {
            value: function search(term) {
              var _this = this;

              return this.provider.fetch().then(function (response) {
                response.result.forEach(function (character) {
                  var missions,
                      missionsArray = [];
                  missions = JSON.parse(character.missions);
                  for (var mission in missions) {
                    missionsArray.push(missions[mission]);
                  }
                  character.missions = missionsArray;
                });
                _this.characters = response.result;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbnMvY2hhcmFjdGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO01BQVEsV0FBVyxFQUNYLGVBQWUsaUNBQ1YsVUFBVTs7OztBQUZmLGlCQUFXLHVCQUFYLFdBQVc7O0FBQ1gscUJBQWUsMkJBQWYsZUFBZTs7Ozs7Ozs7O0FBQ1YsZ0JBQVU7QUFFVixpQkFGQSxVQUFVLENBRVQsUUFBUSxFQUFFLE1BQU0sRUFBRTs7O2dDQUZuQixVQUFVOztBQUduQixjQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixjQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixjQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNsQixjQUFJLFlBQVksR0FBRyxVQUFDLE9BQU8sRUFBSztBQUM5QixrQkFBSyxJQUFJLEdBQUcsTUFBSyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDakMsa0JBQUssUUFBUSxFQUFFLENBQUM7V0FDakIsQ0FBQTtBQUNELGdCQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztTQUN6Qzs7cUJBWFUsVUFBVTtBQWFyQixrQkFBUTttQkFBQSxvQkFBRztBQUNULGtCQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUNiLHVCQUFPO2VBQ1I7Ozs7Ozs7Ozs7OztBQUFBLGFBWUY7O0FBRUQsZ0JBQU07bUJBQUEsZ0JBQUMsSUFBSSxFQUFFOzs7QUFDWCxxQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsRUFBRztBQUMzQyx3QkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxTQUFTLEVBQUU7QUFDMUMsc0JBQUksUUFBUTtzQkFBRSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLDBCQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUMsdUJBQUksSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO0FBQzNCLGlDQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO21CQUN2QztBQUNELDJCQUFTLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztpQkFDcEMsQ0FBQyxDQUFDO0FBQ0gsc0JBQUssVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7ZUFDbkMsQ0FBQyxDQUFDO2FBQ0o7OztBQXpDTSxnQkFBTTttQkFBQSxrQkFBRztBQUFDLHFCQUFPLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQUM7Ozs7ZUFEN0MsVUFBVSIsImZpbGUiOiJwbHVnaW5zL2NoYXJhY3RlcnMuanMiLCJzb3VyY2VSb290IjoiL3NyYy8ifQ==