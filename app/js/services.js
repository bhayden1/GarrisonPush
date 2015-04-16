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
      for (var i=0; i<results.rows.length; i++) {
          characters.push(results.rows.item(i));
      }
      console.log(characters);

      deferred.resolve(characters);
    }, function() {
      deferred.resolve([]);
    });
    return deferred.promise;
  }
  var openDb = function() {
    var db;
    try {
      db = $cordovaSQLite.openDB('gp');
    } catch(e) {
      db = window.openDatabase('gp', '0.1', 'Garrison Info', 1000000);
    }
    return db;
  };
  var characters = [];
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
.factory('CharacterService', function(local, Azure, $q, $ionicLoading) {
  var processResults = function(response, showAdd) {
    var characters = response.result || response;
    characters.forEach(function(character) {
      var missions, missionsArray = [];
      missions = JSON.parse(character.missions);
      for(var mission in missions) {
        missionsArray.push(missions[mission]);
      }
      character.missions = missionsArray;
      character.showAdd = showAdd;
    });
    return characters;
  };

  return {
    getAll: function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      var deferred = $q.defer();
      var characters;
      local.get().then(function(characters) {
        var ids =[];
        characters = characters
        for(var i=0; i < characters.length; i++) {
          ids.push(characters[i].id);
        }
        Azure.fetchByIds(ids.join(",")).then(function(results) {
          var fullChars = processResults(results, false);
          for(var i=0; i< characters.length; i++) {
            for(var j=0; j < fullChars.length; j++) {
              if(fullChars[j].id === characters[i].id) {
                characters[i].missions = fullChars[j].missions;
              }
            }
          }

          $ionicLoading.hide();
          deferred.resolve(characters);
        });
      });
      return deferred.promise;
    }
  }
});
