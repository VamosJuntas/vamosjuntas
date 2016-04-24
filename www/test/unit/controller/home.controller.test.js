describe('HomeController', function() {
  var scope, placeFactory, state, place;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, $httpBackend) {
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
      "title": "Chafariz da Rendenção",
      "occurrences": [{
          "type": "Local Deserto",
          "numberOfOccurrences": 3
        }, {
          "type": "Mal Iluminado",
          "numberOfOccurrences": 6
        }, {
          "type": "roubo",
          "numberOfOccurrences": 6
        }

      ]
    };

    spyOn(placeFactory, 'fetchPlaces').and.callFake(function() {
      return {
        then: function(callback) { return callback(place); }
      };
    });
  });

  it('gets the risk places', function() {
    createController();
    expect(placeFactory.fetchPlaces).toHaveBeenCalled();
  });

  it('should get a total of occurrences from a specific place', function () {
    createController();
    expect(scope.getTotalOfOccurrences(place)).toBe(15);

  });

});
