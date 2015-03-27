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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbnMvYXp1cmUtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7cUNBQWEsV0FBVzs7Ozs7Ozs7Ozs7QUFBWCxpQkFBVztBQUNYLGlCQURBLFdBQVcsR0FDUjtnQ0FESCxXQUFXOztBQUVwQixpQkFBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3JDLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsbUJBQW1CLENBQUMscUNBQXFDLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztTQUNqSTs7cUJBSlUsV0FBVztBQU10QixlQUFLO21CQUFDLGlCQUFHO0FBQ1AscUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQ25DLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBUyxLQUFLLEVBQUM7QUFDdkIscUJBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztlQUNoQixDQUFDLENBQUM7YUFDSjs7QUFFRCxhQUFHO21CQUFBLGFBQUMsSUFBSSxFQUFFO0FBQ1IscUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzthQUN6RTs7QUFFRCx1QkFBYTttQkFBQSx5QkFBRztBQUNkLHFCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQzVEOztBQUVELHFCQUFXO21CQUFBLHVCQUFHO0FBQ1oscUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7YUFDbEM7O0FBRUQsZUFBSzttQkFBQSxlQUFDLElBQUksRUFBRTtBQUNWLHFCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkMscUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7QUFDakUsc0JBQUksRUFBRSxJQUFJO2lCQUNYLEVBQUMsQ0FBQyxDQUFDO2FBQ0w7O0FBRUQsZ0JBQU07bUJBQUEsa0JBQUc7QUFDUCxxQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQy9COztBQUVELGNBQUk7bUJBQUEsZ0JBQUc7QUFDTCxxQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUM7YUFDM0M7Ozs7ZUF0Q1UsV0FBVyIsImZpbGUiOiJwbHVnaW5zL2F6dXJlLWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjLyJ9