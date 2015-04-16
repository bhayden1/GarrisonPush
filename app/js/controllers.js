angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $ionicLoading, CharacterService) {
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
    if($event.target.checked) {
      CharacterService.add(character);
    } else {
      CharacterService.remove(character);
    }
  }

  var search = function(term) {
    return CharacterService.search(term);
  }
})
.controller('CharactersCtrl', function($scope, characters) {
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
