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
              var _this = this;

              if (!this.auth) {
                return;
              }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXJhY3RlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtNQUFRLFdBQVcsRUFDWCxlQUFlLGlDQUNWLFVBQVU7Ozs7QUFGZixpQkFBVyx1QkFBWCxXQUFXOztBQUNYLHFCQUFlLDJCQUFmLGVBQWU7Ozs7Ozs7OztBQUNWLGdCQUFVO0FBRVYsaUJBRkEsVUFBVSxDQUVULFFBQVEsRUFBRSxNQUFNLEVBQUU7OztnQ0FGbkIsVUFBVTs7QUFHbkIsY0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsY0FBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDckIsY0FBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFDbEIsY0FBSSxZQUFZLEdBQUcsVUFBQyxPQUFPLEVBQUs7QUFDOUIsa0JBQUssSUFBSSxHQUFHLE1BQUssUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2pDLGtCQUFLLFFBQVEsRUFBRSxDQUFDO1dBQ2pCLENBQUE7QUFDRCxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDekM7O3FCQVhVLFVBQVU7QUFhckIsa0JBQVE7bUJBQUEsb0JBQUc7OztBQUNULGtCQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUNiLHVCQUFPO2VBQ1I7QUFDRCxxQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsRUFBRztBQUMzQyx3QkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxTQUFTLEVBQUU7QUFDMUMsc0JBQUksUUFBUTtzQkFBRSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLDBCQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUMsdUJBQUksSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO0FBQzNCLGlDQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO21CQUN2QztBQUNELDJCQUFTLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztpQkFDcEMsQ0FBQyxDQUFDO0FBQ0gsc0JBQUssVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7ZUFDbkMsQ0FBQyxDQUFDO2FBQ0o7OztBQTNCTSxnQkFBTTttQkFBQSxrQkFBRztBQUFDLHFCQUFPLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQUM7Ozs7ZUFEN0MsVUFBVSIsImZpbGUiOiJjaGFyYWN0ZXJzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=