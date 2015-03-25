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
              return this.provider.login("google").then(null, function (error) {
                alert(error);
              });
            }
          },
          currentUser: {
            value: function currentUser() {
              return this.provider.currentUser;
            }
          },
          fetch: {
            value: function fetch(id) {
              return this.provider.invokeApi("test", { method: "get" });
            }
          },
          logout: {
            value: function logout() {
              return this.provider.logout();
            }
          },
          auth: {
            value: function auth() {
              return this.provider.currentUser !== null;
            }
          }
        });

        return AzureClient;
      })());
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbnMvYXp1cmUtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7cUNBQWEsV0FBVzs7Ozs7Ozs7Ozs7QUFBWCxpQkFBVztBQUNYLGlCQURBLFdBQVcsR0FDUjtnQ0FESCxXQUFXOztBQUVwQixpQkFBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3JDLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsbUJBQW1CLENBQUMscUNBQXFDLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztTQUNqSTs7cUJBSlUsV0FBVztBQU10QixlQUFLO21CQUFDLGlCQUFHO0FBQ1AscUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQ25DLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBUyxLQUFLLEVBQUM7QUFDdkIscUJBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztlQUNoQixDQUFDLENBQUM7YUFDSjs7QUFFRCxxQkFBVzttQkFBQSx1QkFBRztBQUNaLHFCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO2FBQ2xDOztBQUVELGVBQUs7bUJBQUEsZUFBQyxFQUFFLEVBQUU7QUFDUixxQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUN6RDs7QUFFRCxnQkFBTTttQkFBQSxrQkFBRztBQUNQLHFCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDL0I7O0FBRUQsY0FBSTttQkFBQSxnQkFBRztBQUNMLHFCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQzthQUMzQzs7OztlQTNCVSxXQUFXIiwiZmlsZSI6InBsdWdpbnMvYXp1cmUtY2xpZW50LmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=