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
      "title": "Chafariz da Redenção",
      "occurrences": [{
        "address": "Avenida Ipiranga",
        "risk": "Local Deserto",
        "date": "10/10/2015",
        "period": "Manhã",
        "numberOfOccurrences": 3
      }, {
        "address": "Avenida Ipiranga",
        "risk": "Mal Iluminado",
        "date": "10/10/2015",
        "period": "Manhã",
        "numberOfOccurrences": 4
      }, {
        "address": "Avenida Ipiranga",
        "risk": "roubo",
        "date": "10/10/2015",
        "period": "Manhã",
        "numberOfOccurrences": 10
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

  it('should get a total of occurrences from a specific place', function() {
    createController();
    expect(scope.getTotalOfOccurrences(place)).toBe(17);
  });

});
