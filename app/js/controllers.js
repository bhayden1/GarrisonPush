angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $ionicLoading, CharacterService, characters, $ionicPopover) {
  $scope.term = 'werk';
  $scope.characters = characters;
  $scope.searchCharacters = [];
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
    CharacterService.search(this.term).then(function(characters) {
      $scope.searchCharacters = characters;
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

  $scope.remove = function(character) {
    CharacterService.remove(character);
  }

  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

  var search = function(term) {
    return ;
  }

  $scope.$on('deleted', function(evt, char) {
    var idx =  -1;
    for(var i=0; i< $scope.characters.length; i++) {
      if($scope.characters[i].id === char.id) {
        idx = i;
      }
    }
    $scope.characters.splice(idx, 1);
  });

  $scope.$on('added', function(evt, char) {
    $scope.characters.push(char);
  });

})
.controller('CharactersCtrl', function($scope, characters) {
  var characters = characters;
  var cardIndex = 0;
  $scope.characters = [];
  console.log(characters);
  $scope.characters = Array.prototype.slice.call(characters, 0, 1);
  $scope.cardDestroyed = function($index) {
    $scope.characters.splice($index, 1);
  };

  $scope.cardSwiped = function($index) {
    cardIndex++;
    console.log($index);
    if(cardIndex > characters.length -1) {
      cardIndex = 0;
    }
    $scope.characters.push(characters[cardIndex]);
  }

  $scope.$on('deleted', function(evt, char) {
    var idx =  -1;
    for(var i=0; i< $scope.characters.length; i++) {
      if($scope.characters[i].id === char.id) {
        idx = i;
      }
    }
    $scope.characters.splice(idx, 1);
  });

  $scope.$on('added', function(evt, char) {
    $scope.characters.push(char);
  });
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
