describe('placeDetailsController', function() {
  var scope;
  var placeDetailsFactory;
  var $location;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function($rootScope, $controller, $injector, $httpBackend, _$location_) {
      scope = $rootScope.$new();
      $location = _$location_;
      placeDetailsFactory = $injector.get('placeDetailsFactory');
      spyOn($location, 'path');
      createController = function() {
        $controller('placeDetailsController', {
          '$scope': scope,
          'placeDetailsFactory': placeDetailsFactory,
          '$location': $location
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

  it('should redirect to report page', function() {
    var placeDetailsController = createController();
    scope.submit();
    expect($location.path).toHaveBeenCalledWith('/report');
  });

});
