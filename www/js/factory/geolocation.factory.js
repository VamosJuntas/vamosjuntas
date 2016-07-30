(function() {
  'use strict';
  angular.module('vamosJuntas').factory('geolocationFactory', geolocationFactory);

  geolocationFactory.$inject = ['$cordovaGeolocation'];

  function geolocationFactory($cordovaGeolocation) {
    var geolocationObject = {};

    geolocationObject.getCurrentPosition = getCurrentPosition;

    return geolocationObject;

    function getCurrentPosition() {
      var posOptions = {timeout: 5000, enableHighAccuracy: false};
      return $cordovaGeolocation.getCurrentPosition(posOptions);
    }
  }

})();
