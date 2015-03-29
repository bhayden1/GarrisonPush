export class AzureClient {
  constructor() {
    console.log('creating azure client');
    this.provider = new WindowsAzure.MobileServiceClient('https://gpservice.azure-mobile.net/', 'UUVbarwJGSIulkKJoNuuYfXBTHPtpD58');
  }

  login () {
    var error = function(error){
        alert(error);
    };
    var success = function(user) {
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      console.log(localStorage);
    };
    return this.provider.login('google')
      .then(success, error);
  }

  add(data) {
    return this.provider.invokeApi('private', {method: 'post', body: data});
  }

  fetchUserData() {
    return this.provider.invokeApi('private', {method: 'get'});
  }

  currentUser() {
    return this.provider.currentUser;
  }

  fetch(term) {
    console.log(this.provider.currentUser);
    return this.provider.invokeApi('test', {method: 'get', parameters: {
      term: term
    }});
  }

  logout() {
    return this.provider.logout().then(function() {
      localStorage.removeItem('user')
    });
  }

  auth() {
    var user = localStorage.getItem('user');
    this.provider.currentUser = (user) ? JSON.parse(user) : null;
    return this.provider.currentUser !== null;
  }
}
