var unirest = require('unirest');
var qs = require('querystring');
var Q = require('q');
var headers = {
  'X-ZUMO-APPLICATION':'UUVbarwJGSIulkKJoNuuYfXBTHPtpD58',
  'X-ZUMO-INSTALLATION-ID':'67390b1f-5db8-981f-f11a-df05747aa5c7',
  'X-ZUMO-VERSION':'ZUMO/1.2 (lang=Web; os=--; os_version=--; arch=--; version=1.2.21003.0)'
};

module.exports = {
  check: function(data) {
    var deferred = Q.defer();
    var uuid = data.uuid.replace("'", "''");
    unirest.get('https://gpservice.azure-mobile.net/tables/test')
      .query('$filter=(uuid eq \'' + uuid + '\')')
      .headers(headers)
      .end(function(response){
        var found = response.body[0] || data;
        found.missions = data.missions;
        console.log(found);
        deferred.resolve(found);
      });

    return deferred.promise;
  },
  send:function(data) {
    var deferred = Q.defer();
    data.missions = JSON.stringify(data.missions);
    if(data.id) {
      unirest.patch('https://gpservice.azure-mobile.net/tables/test/' + data.id)
        .headers(headers)
        .send(data)
        .end(function(response) {
          console.log(response.body);
          deferred.resolve(response.body);
        });
    } else if(data.uuid) {
    unirest.post('https://gpservice.azure-mobile.net/tables/test')
      .headers(headers)
      .send(data)
      .end(function(response) {
        console.log(response.body);
        deferred.resolve(response.body);
      });
    } else {
      deferred.resolve({});
    }


    return deferred.promise;
  }
}
