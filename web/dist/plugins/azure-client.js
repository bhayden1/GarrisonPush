System.register([], function (_export) {
  var _createClass, _classCallCheck, AzureClient;

  return {
    setters: [],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      AzureClient = _export("AzureClient", (function () {
        function AzureClient() {
          _classCallCheck(this, AzureClient);

          console.log("creating azure client");
          this.provider = new WindowsAzure.MobileServiceClient("https://gpservice.azure-mobile.net/", "UUVbarwJGSIulkKJoNuuYfXBTHPtpD58");
        }

        _createClass(AzureClient, {
          login: {
            value: function login() {
              var error = (function (_error) {
                var _errorWrapper = function error(_x) {
                  return _error.apply(this, arguments);
                };

                _errorWrapper.toString = function () {
                  return _error.toString();
                };

                return _errorWrapper;
              })(function (error) {
                alert(error);
              });
              var success = function success(user) {
                console.log(user);
                localStorage.setItem("user", JSON.stringify(user));
                console.log(localStorage);
              };
              return this.provider.login("google").then(success, error);
            }
          },
          add: {
            value: function add(data) {
              return this.provider.invokeApi("private", { method: "post", body: data });
            }
          },
          fetchUserData: {
            value: function fetchUserData() {
              return this.provider.invokeApi("private", { method: "get" });
            }
          },
          currentUser: {
            value: function currentUser() {
              return this.provider.currentUser;
            }
          },
          fetch: {
            value: function fetch(term) {
              console.log(this.provider.currentUser);
              return this.provider.invokeApi("test", { method: "get", parameters: {
                  term: term
                } });
            }
          },
          logout: {
            value: function logout() {
              return this.provider.logout().then(function () {
                localStorage.removeItem("user");
              });
            }
          },
          auth: {
            value: function auth() {
              var user = localStorage.getItem("user");
              this.provider.currentUser = user ? JSON.parse(user) : null;
              return this.provider.currentUser !== null;
            }
          }
        });

        return AzureClient;
      })());
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbnMvYXp1cmUtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7cUNBQWEsV0FBVzs7Ozs7Ozs7Ozs7QUFBWCxpQkFBVztBQUNYLGlCQURBLFdBQVcsR0FDUjtnQ0FESCxXQUFXOztBQUVwQixpQkFBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3JDLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsbUJBQW1CLENBQUMscUNBQXFDLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztTQUNqSTs7cUJBSlUsV0FBVztBQU10QixlQUFLO21CQUFDLGlCQUFHO0FBQ1Asa0JBQUksS0FBSzs7Ozs7Ozs7OztpQkFBRyxVQUFTLEtBQUssRUFBQztBQUN2QixxQkFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2VBQ2hCLENBQUEsQ0FBQztBQUNGLGtCQUFJLE9BQU8sR0FBRyxpQkFBUyxJQUFJLEVBQUU7QUFDM0IsdUJBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEIsNEJBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNuRCx1QkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztlQUMzQixDQUFDO0FBQ0YscUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQ2pDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDekI7O0FBRUQsYUFBRzttQkFBQSxhQUFDLElBQUksRUFBRTtBQUNSLHFCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7YUFDekU7O0FBRUQsdUJBQWE7bUJBQUEseUJBQUc7QUFDZCxxQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUM1RDs7QUFFRCxxQkFBVzttQkFBQSx1QkFBRztBQUNaLHFCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO2FBQ2xDOztBQUVELGVBQUs7bUJBQUEsZUFBQyxJQUFJLEVBQUU7QUFDVixxQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZDLHFCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO0FBQ2pFLHNCQUFJLEVBQUUsSUFBSTtpQkFDWCxFQUFDLENBQUMsQ0FBQzthQUNMOztBQUVELGdCQUFNO21CQUFBLGtCQUFHO0FBQ1AscUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBVztBQUM1Qyw0QkFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtlQUNoQyxDQUFDLENBQUM7YUFDSjs7QUFFRCxjQUFJO21CQUFBLGdCQUFHO0FBQ0wsa0JBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsa0JBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLEFBQUMsSUFBSSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzdELHFCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQzthQUMzQzs7OztlQWhEVSxXQUFXIiwiZmlsZSI6InBsdWdpbnMvYXp1cmUtY2xpZW50LmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=