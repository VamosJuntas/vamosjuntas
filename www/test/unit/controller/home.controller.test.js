describe('HomeController', function() {
  var scope, placeFactory, state, place;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function($rootScope, $controller, $injector, $httpBackend) {
      scope = $rootScope.$new();
      placeFactory = $injector.get('placeFactory');

      createController = function() {
        $controller('HomeController', {
          '$scope': scope,
          'placeFactory': placeFactory,
        });
      };
    });

    place = {
      "address": "Av. Ipiranga",
      "location": {
        "latitude": 10,
        "longitude": 20
      },
      "occurrences": [{
        "risk": "Roubo",
        "count": 5,
        "reports": [
          {
          "date": "10/10/2016",
          "period": "Manhã"
        },
        {
          "date": "12/10/2016",
          "period": "Manhã"
        }]},
        {
          "risk": "Local Mal Iluminado",
          "count": 3,
          "reports": [
            {
            "date": "10/10/2016",
            "period": "Manhã"
          },
          {
            "date": "12/10/2016",
            "period": "Manhã"
          }]
      }]
    };

    spyOn(placeFactory, 'fetchPlaces').and.callFake(function() {
      return {
        then: function(callback) {
          return callback(place);
        }
      };
    });
  });

  it('gets the risk places', function() {
    createController();
    expect(placeFactory.fetchPlaces).toHaveBeenCalled();
  });

  it('get all the occurrences', function(){
    createController();
    expect(scope.getTotalOfOccurrences(place)).toBe(8);
  })
});
