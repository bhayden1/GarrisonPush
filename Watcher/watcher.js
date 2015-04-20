var watcher = require('watchr');
var argv = require('minimist')(process.argv.slice(2));
var azure = require('./azure.js');
var q = require('q');
var fileProcess = require('./processFile.js');
var base = argv.p || 'C:\Program Files (x86)\\World of Warcraft';
var path = base + '\\WTF\\Account';
var regEx = /GP.lua$/gi
console.log(path);
if(argv.t) {
  //var filePath  = "C:\\Program Files (x86)\\World of Warcraft\\WTF\\Account\\BHAYDEN1\\Kael'thas\\Valour\\SavedVariables\\GP.lua";
  var filePath  = "C:\\Program Files (x86)\\World of Warcraft\\WTF\\Account\\BHAYDEN1\\Vek'nilash\\Werk\\SavedVariables\\GP.lua";
  fileProcess(filePath)
    .then(azure.send)
    .then(function(data) {
      console.log('all done!')
      console.log(data);
    });
} else {
  watcher.watch({
      paths: [path],
      listeners: {
          log: function(logLevel){

          },
          error: function(err){
              console.log('an error occured:', err);
          },
          watching: function(err,watcherInstance,isWatching){
              if (err) {
                  console.log("watching the path " + watcherInstance.path + " failed with error", err);
              }
          },
          change: function(changeType,filePath,fileCurrentStat,filePreviousStat){
              if(filePath.match(regEx)) {
                console.log('a change event occured for :',filePath);
                fileProcess(filePath)                  
                  .then(azure.send)
                  .then(function(data) {
                    console.log('all done!')
                    console.log(data);
                  });
              }
          }
      },
      next: function(err,watchers){
          if (err) {
              return console.log("watching everything failed with error", err);
          } else {
              console.log('watching everything completed', watchers);
          }
      }
  });
}
