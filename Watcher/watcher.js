var watcher = require('watchr');
var argv = require('minimist')(process.argv.slice(2));
var base = argv.p || 'C:\Program Files (x86)\\World of Warcraft';
var path = base + '\\WTF\\Account';
var regEx = /GP.lua$/gi
console.log(path)
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
              console.log('a change event occured:',arguments);
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
