angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Azure, $q, $ionicLoading, local) {
  $scope.term = 'werk';
  $scope.characters = [];
  $scope.searchTyped = function($event) {
    if($event.which === 13) {
      this.search();
    }
  }

  $scope.search = function() {
    var self = this;
    $ionicLoading.show({
      template: 'Searching...'
    });
    search(this.term).then(function(characters) {
      $scope.characters = characters;
      $ionicLoading.hide();
    });
  }

  $scope.add = function(character) {
    local.add(character);
  }

  var search = function(term) {
    var deferred = $q.defer();
    Azure.fetch(term).then(function(response) {
      var characters = processResults(response, true);
      deferred.resolve(characters);
    });
    return deferred.promise;
  }

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
  }
})
.controller('CharactersCtrl', function($scope, local, $ionicLoading, Azure) {
  $scope.characters = [];
  $ionicLoading.show({
    template: 'Loading...'
  });

  $scope.cardDestroyed = function($index) {
    console.log('card destroyed')
  };
  local.get().then(function(characters) {
    var ids =[];
    for(var i=0; i < characters.length; i++) {
      ids.push(characters[i].id);
    }
    Azure.fetchByIds(ids.join(",")).then(function(results) {
      console.log(results);
    })
    $scope.characters = characters;
    $ionicLoading.hide();
  })
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
