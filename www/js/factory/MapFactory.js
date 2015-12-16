angular.module('vamosJuntas').factory('mapFactory', function($cordovaGeolocation) {
  var map = {};
  map.position;

  map.getPosition = function () {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
      map.position = position;
    });
  };

  return map;
});
