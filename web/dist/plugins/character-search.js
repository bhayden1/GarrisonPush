System.register(["aurelia-framework", "./azure-client", "aurelia-event-aggregator"], function (_export) {
  var Behavior, AzureClient, EventAggregator, _createClass, _classCallCheck, CharacterSearch;

  return {
    setters: [function (_aureliaFramework) {
      Behavior = _aureliaFramework.Behavior;
    }, function (_azureClient) {
      AzureClient = _azureClient.AzureClient;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      //import {Characters} from '../Characters';

      CharacterSearch = _export("CharacterSearch", (function () {

        //constructor(provider, events, characters) {
        function CharacterSearch(provider, events) {
          _classCallCheck(this, CharacterSearch);

          this.provider = provider;
          this.events = events;
          this.loggedIn = this.provider.auth();
          this.term = "";
          //this.characters = characters;
        }

        _createClass(CharacterSearch, {
          search: {
            value: function search() {
              console.log("search");
              this.events.publish("search", this.term);
              //this.characters.search(this.term);
            }
          },
          changed: {
            value: function changed(evt) {
              if (evt.which === 13) {
                console.log(evt.which);
                this.search();
              }
            }
          }
        }, {
          inject: {
            //static inject() {return [AzureClient, EventAggregator, Characters];}

            value: function inject() {
              return [AzureClient, EventAggregator];
            }
          },
          metadata: {
            value: function metadata() {
              return Behavior.customElement("search");
            }
          }
        });

        return CharacterSearch;
      })());
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbnMvY2hhcmFjdGVyLXNlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO01BQVEsUUFBUSxFQUNSLFdBQVcsRUFDWCxlQUFlLGlDQUdWLGVBQWU7Ozs7QUFMcEIsY0FBUSxxQkFBUixRQUFROztBQUNSLGlCQUFXLGdCQUFYLFdBQVc7O0FBQ1gscUJBQWUsMkJBQWYsZUFBZTs7Ozs7Ozs7Ozs7QUFHVixxQkFBZTs7O0FBU2IsaUJBVEYsZUFBZSxDQVNaLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0NBVHJCLGVBQWU7O0FBVXhCLGNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLGNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQyxjQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7U0FFaEI7O3FCQWZVLGVBQWU7QUFpQjFCLGdCQUFNO21CQUFBLGtCQUFHO0FBQ1AscUJBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDckIsa0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O2FBRTFDOztBQUVELGlCQUFPO21CQUFBLGlCQUFDLEdBQUcsRUFBRTtBQUNYLGtCQUFHLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO0FBQ25CLHVCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixvQkFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2VBQ2Y7YUFDRjs7O0FBMUJNLGdCQUFNOzs7bUJBQUEsa0JBQUc7QUFBQyxxQkFBTyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUFDOztBQUNqRCxrQkFBUTttQkFBQSxvQkFBRTtBQUNmLHFCQUFPLFFBQVEsQ0FDWixhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7YUFDM0I7Ozs7ZUFOVSxlQUFlIiwiZmlsZSI6InBsdWdpbnMvY2hhcmFjdGVyLXNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjLyJ9