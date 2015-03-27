export class AzureClient {
  constructor() {
    console.log('creating azure client');
    this.provider = new WindowsAzure.MobileServiceClient('https://gpservice.azure-mobile.net/', 'UUVbarwJGSIulkKJoNuuYfXBTHPtpD58');
  }

  login () {
    return this.provider.login("google")
    .then(null, function(error){
        alert(error);
    });
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
    return this.provider.logout();
  }

  auth() {
    return this.provider.currentUser !== null;
  }
}
