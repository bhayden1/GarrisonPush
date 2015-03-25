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

  currentUser() {
    return this.provider.currentUser;
  }

  fetch(id) {
    return this.provider.invokeApi('test', {method: 'get'});
  }

  logout() {
    return this.provider.logout();
  }

  auth() {
    return this.provider.currentUser !== null;
  }
}
