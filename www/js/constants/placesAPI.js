angular.module('vamosJuntas').constant('PlacesAPI', {
  autoCompleteBaseUrl: AppSettings.mapsAPIBaseUrl + '/autocomplete/json?',
  coordinatesBaseUrl: AppSettings.mapsAPIBaseUrl + '/details/json?',
  nearbySearchBaseUrl: AppSettings.mapsAPIBaseUrl + '/nearbysearch/json?'
});
