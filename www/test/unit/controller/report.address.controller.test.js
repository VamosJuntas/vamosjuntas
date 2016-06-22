describe('ReportAddressController', function() {
  var scope, state, $location;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, $httpBackend, _$location_) {
        scope = $rootScope.$new();
        $location = _$location_;
        spyOn($location, 'path');
        createController = function(stateParams) {
          var $stateParams;
          var defaultStateParams = {
            address: ''
          };
          if(stateParams == undefined){
            $stateParams = defaultStateParams;
          } else {
            $stateParams = stateParams;
          }

          $controller('ReportAddressController', {
            '$scope': scope,
            '$location': $location,
            '$stateParams': $stateParams
          });
        };
    });
  });

  describe('when submit form', function() {
    describe('and form is valid', function() {
      it('should redirect to the success page', function() {
        var controller = createController();
        scope.submit(true);
        expect($location.path).toHaveBeenCalledWith('/confirmation');
      });
    });

    describe('and form is not valid', function() {
      it('should not redirect to the success page if address is empty', function() {
        var controller = createController();
        scope.submit(false);
        expect($location.path).not.toHaveBeenCalled();
      });
    });
  });

  describe('when an address is received', function() {
    it('should be passed to report.address', function() {
      var stateParams = {
        address: 'anyAddress'
      };
      var controller = createController(stateParams);
      expect(scope.report.address).toEqual(stateParams.address);
    });
  });
});
