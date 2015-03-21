var fs = require('fs');
var Q = require('q');

var parseFileData = function(data) {
  var jsonString = data.substr(data.indexOf('MissionsJson')),
      returnData = {}, last = jsonString.lastIndexOf('"');
      jsonString = jsonString.substr(0, last);
  jsonString = jsonString.replace('MissionsJson = "', '');
  jsonString = jsonString.replace(/\\\"/g, '"');
  console.log(jsonString);
  returnData = JSON.parse(jsonString);
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
