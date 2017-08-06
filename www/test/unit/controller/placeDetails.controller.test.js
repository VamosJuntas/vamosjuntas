describe('placeDetailsController', function() {
  var scope;
  var placeFactory;
  var $location;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function($rootScope, $controller, $injector, $httpBackend, _$location_) {
      scope = $rootScope.$new();
      $location = _$location_;
      placeFactory = $injector.get('placeFactory');
      spyOn($location, 'path');
      createController = function() {
        $controller('placeDetailsController', {
          '$scope': scope,
          'placeFactory': placeFactory,
          '$location': $location
        });
      };
    });

    spyOn(placeFactory, 'getPlace').and.returnValue({title: 'Parada da João Pessoa', occurrences: []});
  });

  it('gets the risk places', function() {
    createController();
    expect(placeFactory.getPlace).toHaveBeenCalled();
  });

  it('should get a place', function() {
    createController();
    expect(scope.placeDetails.title).toBe('Parada da João Pessoa');
  });

  it('should redirect to report page', function() {
    var placeController = createController();
    scope.submit();
    expect($location.path).toHaveBeenCalledWith('/report');
  });

});
