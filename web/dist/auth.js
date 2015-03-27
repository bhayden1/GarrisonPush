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
                _this.events.publish("login", _this.provider.currentUser());
                _this.loggedIn = _this.provider.auth();
              };
              this.provider.login().then(handler);
            }
          },
          getUserData: {
            value: function getUserData() {
              this.events.publish("refreshUser");
            }
          },
          logout: {
            value: function logout() {
              this.provider.logout();
              this.events.publish("logout", this.provider.currentUser());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtNQUFRLFFBQVEsRUFDUixXQUFXLEVBQ1gsZUFBZSxpQ0FDVixJQUFJOzs7O0FBSFQsY0FBUSxxQkFBUixRQUFROztBQUNSLGlCQUFXLHVCQUFYLFdBQVc7O0FBQ1gscUJBQWUsMkJBQWYsZUFBZTs7Ozs7Ozs7O0FBQ1YsVUFBSTtBQU9KLGlCQVBBLElBQUksQ0FPSCxRQUFRLEVBQUUsTUFBTSxFQUFFO2dDQVBuQixJQUFJOztBQVFiLGNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLGNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0Qzs7cUJBWFUsSUFBSTtBQWFmLGNBQUk7bUJBQUEsZ0JBQUc7OztBQUNMLGtCQUFJLE9BQU8sR0FBRyxVQUFDLE1BQU0sRUFBSztBQUN4QixzQkFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFLLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQzFELHNCQUFLLFFBQVEsR0FBRyxNQUFLLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztlQUN0QyxDQUFBO0FBQ0Qsa0JBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JDOztBQUVELHFCQUFXO21CQUFBLHVCQUFHO0FBQ1osa0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3BDOztBQUVELGdCQUFNO21CQUFBLGtCQUFHO0FBQ1Asa0JBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdkIsa0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDM0Qsa0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN0Qzs7O0FBNUJNLGdCQUFNO21CQUFBLGtCQUFHO0FBQUMscUJBQU8sQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7YUFBQzs7QUFDakQsa0JBQVE7bUJBQUEsb0JBQUU7QUFDZixxQkFBTyxRQUFRLENBQ1osYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ3pCOzs7O2VBTFUsSUFBSSIsImZpbGUiOiJhdXRoLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=