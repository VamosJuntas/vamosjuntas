// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('vamosJuntas', ['ionic', 'ngCordova'])

.constant('ApiEndpoint', {
  url: 'http://localhost:3001/reports'
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('splash', {
    url: '/',
    templateUrl: 'templates/splash.html',
    controller: 'SplashController'
  })
  .state('confirmation', {
    url: '/confirmation',
    templateUrl: 'templates/confirmation.html'
  })
  .state('report', {
    url: '/report',
    templateUrl: 'templates/report-address.html',
    controller: 'ReportAddressController',
    cache: false,
    params: {
      address: '',
      latitude: '',
      longitude: ''
    }
  })
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  })
  .state('placeDetails', {
    url: '/placeDetails',
    templateUrl: 'templates/placeDetails.html',
    controller: 'placeDetailsController'
  });

  $urlRouterProvider.otherwise('/');

});
