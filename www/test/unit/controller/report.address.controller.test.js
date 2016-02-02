describe('ReportAddressController', function() {
  var scope, state, $location;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, $httpBackend, _$location_) {
        scope = $rootScope.$new();
        $location = _$location_;
        spyOn($location, 'path');
        createController = function() {
          $controller('ReportAddressController', {
            '$scope': scope,
            '$location': $location
          });
        };
    });
  });

  describe('when submit form', function() {
    describe('and form is valid', function() {
      it('should redirect to the success page', function() {
        var reportForm = {
          $valid: true
        };
        var controller = createController();
        scope.submit(reportForm);
        expect($location.path).toHaveBeenCalledWith('/confirmation');
      });
    });

    describe('and form is not valid', function() {    
      it('should not redirect to the success page if address is empty', function() {
        var reportForm = {
          $valid: false
        };
        var controller = createController();
        scope.submit(reportForm);
        expect($location.path).not.toHaveBeenCalled();
      });
    });
  });
});
