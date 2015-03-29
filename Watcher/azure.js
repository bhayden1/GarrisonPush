var unirest = require('unirest');
var qs = require('querystring');
var Q = require('q');
var headers = {
  'X-ZUMO-APPLICATION':'UUVbarwJGSIulkKJoNuuYfXBTHPtpD58',
  'X-ZUMO-INSTALLATION-ID':'67390b1f-5db8-981f-f11a-df05747aa5c7',
  'X-ZUMO-VERSION':'ZUMO/1.2 (lang=Web; os=--; os_version=--; arch=--; version=1.2.21003.0)'
};

module.exports = {
  send:function(data) {
    var deferred = Q.defer();
    data.missions = JSON.stringify(data.missions);    
    unirest.post('https://gpservice.azure-mobile.net/api/character')
      .headers(headers)
      .send(data)
      .end(function(response) {
        deferred.resolve(response.body);
      });
    return deferred.promise;
  }
}
