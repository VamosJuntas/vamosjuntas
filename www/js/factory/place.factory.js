angular.module('vamosJuntas').factory('placeFactory', [function() {
  var places = {
    reports: ['initialPlace']
  };

  function fetchPlaces() {
    places.reports = [
      {
        title: 'Chafariz da Rendenção',
        quantity: 5
      },
      {
        title: 'Parada João Pessoa',
        quantity: 3
      }
    ];
  }

  return {
    fetchPlaces: fetchPlaces,
    places: places
  };
}]);
