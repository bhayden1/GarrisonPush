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

  $scope.add = function(character, $event) {
    console.log($event.target.checked);
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
.controller('CharactersCtrl', function($scope, $ionicLoading, characters) {
  $scope.characters = characters;
  $scope.cardDestroyed = function($index) {
    console.log('card destroyed')
  };

})
.controller('AccountCtrl', function($scope, Azure) {
  $scope.loggedIn = false;

  $scope.login = function() {
    console.log('logging in');
    Azure.login().then(function(result) {
        console.log(result);
    });
  };
});
