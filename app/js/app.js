// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic.contrib.ui.cards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })
  .state('tab.characters', {
      url: '/chars',
      views: {
        'tab-chars': {
          templateUrl: 'templates/tab-chars.html',
          controller: 'CharactersCtrl',
          resolve: {
            characters: function(CharacterService) {
              console.log("resolving characters")
              return CharacterService.getAll();
            }
          }
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('card', {
    url: '/card',
    templateUrl: 'templates/card-test.html',
    controller: 'CharactersCtrl',
    resolve: {
      characters: function(CharacterService) {
        console.log("resolving characters")
        return CharacterService.getAll();
      }
    }
  });/*
  $stateProvider.state('aspects', {
      url: '/aspects',
      templateUrl: 'aspectsView',
      controller: 'AspectController'
  });
  */

  $urlRouterProvider.otherwise('/tab/chars');
});
