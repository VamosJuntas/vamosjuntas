describe('ReportAddressController', function() {
  var scope, state, $location, placeFactory, place, $httpBackend;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, _$httpBackend_, _$location_) {
      scope = $rootScope.$new();
      $location = _$location_;
      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET(/templates.*/).respond('');

      spyOn($location, 'path');
      createController = function(stateParams) {
        var $stateParams;
        var defaultStateParams = {
          address: ''
        };
        if(stateParams === undefined) {
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
      it('should post to endpint with report data', function() {
        createController();
        scope.search = {
          text: 'The Adress',
          latitude: '30',
          longitude: '50',
        };
        scope.report = {
          risk: 'risk',
          date: '10/10/2010'
        };
        scope.submit(true);
        $httpBackend.resetExpectations();
        $httpBackend.expectPOST('http://localhost:3001/reports', {
          "address": scope.report.address,
          "geolocation": {
            "latitude": scope.report.latitude,
            "longitude": scope.report.longitude
          },
          "category": scope.report.risk,
          "date": scope.report.date
        }).respond(201);
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      });

      it('should redirect to the success page when response is success', function() {
        createController();
        scope.submit(true);
        $httpBackend.when('POST', 'http://localhost:3001/reports').respond(201);
        $httpBackend.flush();
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
    it('should be passed to search.text', function() {
      var stateParams = {
        address: 'anyAddress'
      };
      var controller = createController(stateParams);
      expect(scope.search.text).toEqual(stateParams.address);
    });
  });

  describe('when an latitude is received', function() {
    it('should be passed to search.latitude', function() {
      var stateParams = {
        latitude: '1'
      };
      var controller = createController(stateParams);
      expect(scope.search.latitude).toEqual(stateParams.latitude);
    });
  });

  describe('when an longitude is received', function() {
    it('should be passed to search.longitude', function() {
      var stateParams = {
        longitude: '20'
      };
      var controller = createController(stateParams);
      expect(scope.search.longitude).toEqual(stateParams.longitude);
    });
  });
});
