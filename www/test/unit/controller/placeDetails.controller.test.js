describe('placeDetailsController', function() {
  var scope, placeDetailsFactory, state;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, $httpBackend) {
        scope = $rootScope.$new();
        placeDetailsFactory = $injector.get('placeDetailsFactory');

        createController = function() {
          $controller('placeDetailsController', {
              '$scope': scope,
              'placeDetailsFactory': placeDetailsFactory,
          });
        };
    });

  });

  it('gets the risk places', function() {
    spyOn(placeDetailsFactory, 'fetchPlace');
    createController();
    expect(placeDetailsFactory.fetchPlace).toHaveBeenCalled();
  });

  it('should get a place', function() {
    spyOn(placeDetailsFactory, 'fetchPlace').and.callThrough();
    createController();
    expect(scope.placeDetails.title).toBe('Parada da João Pessoa');

  });

});
