describe('splash controller', function () {
	var scope, state, $location;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, $httpBackend, _$location_) {
        scope = $rootScope.$new();
        $location = _$location_;
        spyOn($location, 'path');
        createController = function() {
          $controller('SplashController', {
            '$scope': scope,
            '$location': $location
          });
        };
    });
  });

  describe('when submit form', function() {
    it('redirects to the success page', function() {
      var controller = createController();
      scope.submit();
      expect($location.path).toHaveBeenCalledWith('/placeDetails');
    });
  });
});
