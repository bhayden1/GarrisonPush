var fs = require('fs');
var Q = require('q');
var moment = require('moment');

var parseFileData = function(data) {
  var jsonString = data.substr(data.indexOf('MissionsJson')),
      returnData = {}, last = jsonString.lastIndexOf('"');
      jsonString = jsonString.substr(0, last);
  jsonString = jsonString.replace('MissionsJson = "', '');
  jsonString = jsonString.replace(/\\\"/g, '"');
  returnData = JSON.parse(jsonString);
  for (var key in returnData.missions) {
    var end = moment(returnData.missions[key].start).add(returnData.missions[key].durationSeconds, 's');
    returnData.missions[key].end = end.format('MM/DD/YY HH:mm:ss');
  }
  console.log(returnData);
  return returnData;
};

module.exports = function(fileName) {
  var deferred = Q.defer();
  fs.readFile(fileName, 'utf8', function(err, data) {
    if(err) {
      deferred.reject(err);
      console.log(err);
    } else {
      deferred.resolve(parseFileData(data));
    }
  });
  return deferred.promise;
}
