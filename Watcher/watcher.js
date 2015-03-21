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
  console.log("test");
//var filePath  = "C:\\Program Files (x86)\\World of Warcraft\\WTF\\Account\\BHAYDEN1\\Vek'nilash\\Paks\\SavedVariables\\GP.lua";
var filePath  = "C:\\Program Files (x86)\\World of Warcraft\\WTF\\Account\\BHAYDEN1\\Kael'thas\\Valour\\SavedVariables\\GP.lua";
fileProcess(filePath)
  .then(azure.check)
  .then(azure.send)
  .then(function(data) {
    console.log('all done!')
  });

} else {
  watcher.watch({
      paths: [path],
      listeners: {
          log: function(logLevel){
              //console.log('a log message occured:', arguments);
          },
          error: function(err){
              console.log('an error occured:', err);
          },
          watching: function(err,watcherInstance,isWatching){
              if (err) {
                  console.log("watching the path " + watcherInstance.path + " failed with error", err);
              } else {
                  //console.log("watching the path " + watcherInstance.path + " completed");
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

          // Close watchers after 60 seconds
          /*setTimeout(function(){
              var i;
              console.log('Stop watching our paths');
              for ( i=0;  i<watchers.length; i++ ) {
                  watchers[i].close();
              }
          },60*1000);*/
      }
  });
}
