angular.module('starter.services', [])
.factory('local', function($cordovaSQLite, $cordovaDevice, $q) {
  var checkTable = function(tx) {
    //tx.executeSql('DROP TABLE characters');
    tx.executeSql('CREATE TABLE IF NOT EXISTS characters (cid integer primary key, character text, realm text, id text, uuid text)');
  };
  var add = function(tx, character, uuid) {
    tx.executeSql('SELECT * FROM characters where id=?', [character.id], function(transaction, results) {
      if(results.rows.length > 0) {
        return;
      }
      tx.executeSql('INSERT INTO characters (character, realm, id, uuid) values(?, ?, ?, ?)', [character.Character, character.Realm, character.id, uuid]);
    });
  };
  var read = function(tx) {
    var deferred = $q.defer();
    tx.executeSql('SELECT character, realm, id, uuid FROM characters', [], function(transaction, results) {
      var characters = [];
      for (var i=0; i<results.rows.length; i++) {
          characters.push(results.rows.item(i));
      }
      console.log(characters);
      deferred.resolve(characters);
    });
    return deferred.promise;
  }
  var openDb = function() {
    var db;
    try {
      db = $cordovaSQLite.openDB('gp');
      console.log('cordova plugin worked!');
    } catch(e) {
      db = window.openDatabase('gp', '0.1', 'Garrison Info', 1000000);
    }
    return db;
  };
  return {
    add: function(character) {
      var uuid = $cordovaDevice.getUUID();
      var db = openDb();
      db.transaction(function(tx){
        checkTable(tx);
        add(tx, character, uuid);
      });

      db.transaction(function(tx) {
        read(tx);
      });
    },
    get: function() {
      var deferred = $q.defer();
      var db = openDb();
      db.transaction(function(tx) {
        read(tx).then(function(characters){
          deferred.resolve(characters);
        });
      });
      return deferred.promise;
    }
  }
})
.factory('Azure', function() {
  var client = new WindowsAzure.MobileServiceClient('https://gpservice.azure-mobile.net/', 'UUVbarwJGSIulkKJoNuuYfXBTHPtpD58');
  return {
    login: function() {
      var error = function(error){
          alert(error);
      };
      var success = function(user) {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage);
      };
      return client.login('google')
        .then(success, error);
    },
    add: function(data) {
      return client.invokeApi('private', {method: 'post', body: data});
    },
    fetchUserData: function() {
      return client.invokeApi('private', {method: 'get'});
    },
    currentUser: function() {
      return client.currentUser;
    },
    fetchByIds: function(characters) {
      return client.invokeApi('mobile', {method: 'get', parameters: {
        characters: characters
      }});
    },
    fetch: function(term) {
      console.log(client.currentUser);
      return client.invokeApi('test', {method: 'get', parameters: {
        term: term
      }});
    },
    logout: function() {
      return client.logout().then(function() {
        localStorage.removeItem('user')
      });
    },
    auth: function() {
      var user = localStorage.getItem('user');
      this.provider.currentUser = (user) ? JSON.parse(user) : null;
      return this.provider.currentUser !== null;
    }
  }
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
