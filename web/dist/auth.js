System.register(["aurelia-framework", "./plugins/azure-client", "aurelia-event-aggregator"], function (_export) {
  var Behavior, AzureClient, EventAggregator, _createClass, _classCallCheck, Auth;

  return {
    setters: [function (_aureliaFramework) {
      Behavior = _aureliaFramework.Behavior;
    }, function (_pluginsAzureClient) {
      AzureClient = _pluginsAzureClient.AzureClient;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      Auth = _export("Auth", (function () {
        function Auth(provider, events) {
          _classCallCheck(this, Auth);

          this.provider = provider;
          this.events = events;
          this.loggedIn = this.provider.auth();
        }

        _createClass(Auth, {
          auth: {
            value: function auth() {
              var _this = this;

              var handler = function (result) {
                console.log(result);
                console.log(_this);
                _this.events.publish("login", _this.provider.currentUser());
                _this.loggedIn = _this.provider.auth();
              };
              this.provider.login().then(handler);
            }
          },
          logout: {
            value: function logout() {
              this.provider.logout();
              this.loggedIn = this.provider.auth();
            }
          }
        }, {
          inject: {
            value: function inject() {
              return [AzureClient, EventAggregator];
            }
          },
          metadata: {
            value: function metadata() {
              return Behavior.customElement("auth");
            }
          }
        });

        return Auth;
      })());
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtNQUFRLFFBQVEsRUFDUixXQUFXLEVBQ1gsZUFBZSxpQ0FDVixJQUFJOzs7O0FBSFQsY0FBUSxxQkFBUixRQUFROztBQUNSLGlCQUFXLHVCQUFYLFdBQVc7O0FBQ1gscUJBQWUsMkJBQWYsZUFBZTs7Ozs7Ozs7O0FBQ1YsVUFBSTtBQU9KLGlCQVBBLElBQUksQ0FPSCxRQUFRLEVBQUUsTUFBTSxFQUFFO2dDQVBuQixJQUFJOztBQVFiLGNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLGNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0Qzs7cUJBWFUsSUFBSTtBQWFmLGNBQUk7bUJBQUEsZ0JBQUc7OztBQUNMLGtCQUFJLE9BQU8sR0FBRyxVQUFDLE1BQU0sRUFBSztBQUN4Qix1QkFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQix1QkFBTyxDQUFDLEdBQUcsT0FBTSxDQUFDO0FBQ2xCLHNCQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQUssUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDMUQsc0JBQUssUUFBUSxHQUFHLE1BQUssUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2VBQ3RDLENBQUE7QUFDRCxrQkFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDckM7O0FBRUQsZ0JBQU07bUJBQUEsa0JBQUc7QUFDUCxrQkFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN2QixrQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3RDOzs7QUF6Qk0sZ0JBQU07bUJBQUEsa0JBQUc7QUFBQyxxQkFBTyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUFDOztBQUNqRCxrQkFBUTttQkFBQSxvQkFBRTtBQUNmLHFCQUFPLFFBQVEsQ0FDWixhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDekI7Ozs7ZUFMVSxJQUFJIiwiZmlsZSI6ImF1dGguanMiLCJzb3VyY2VSb290IjoiL3NyYy8ifQ==