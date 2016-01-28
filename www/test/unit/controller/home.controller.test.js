describe('HomeController', function() {
  var scope, placeFactory, state;

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

    spyOn(placeFactory, 'fetchPlaces');
  });

  it('gets the risk places', function() {
    createController();
    expect(placeFactory.fetchPlaces).toHaveBeenCalled();
  });

});
