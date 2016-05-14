describe('ReportAddressController', function() {
  var scope, placeFactory, $location, place;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function($rootScope, $controller, $injector, $httpBackend, _$location_) {
      scope = $rootScope.$new();
      $location = _$location_;
      placeFactory = $injector.get('placeFactory');
      $httpBackend.whenGET(/templates.*/).respond('');
      spyOn($location, 'path');
      createController = function() {
        $controller('ReportAddressController', {
          '$scope': scope,
          'placeFactory': placeFactory,
          '$location': $location
        });
      };
    });

    place = {
      "address": "Av. Ipiranga",
      "location": {
        "latitude": 10,
        "longitude": 20
      },
      "occurrences": [{
        "risk": "Roubo",
        "count": 2,
        "reports": [{
          "date": "10/10/2016",
          "period": "Manhã"
        }, {
          "date": "12/10/2016",
          "period": "Manhã"
        }]
      }, {
        "risk": "Local Mal Iluminado",
        "count": 2,
        "reports": [{
          "date": "10/10/2016",
          "period": "Manhã"
        }, {
          "date": "12/10/2016",
          "period": "Manhã"
        }]
      }]
    };

    spyOn(placeFactory,'getPlace').and.returnValue(place);
  });

  describe('Saving data', function() {
    it('should save a new occurrence for existent risk', function () {
      createController();
      scope.placeDetails = placeFactory.getPlace();
      scope.report = {
        "risk" : "Roubo",
        "date": "10/10/2016",
        "period": "Manhã"
      };
      scope.submit(true);
      scope.$apply();
      expect(scope.placeDetails.occurrences[0].count).toEqual(3);
    });

    it('should save a new occurrence for a non existent risk', function () {
      createController();
      scope.placeDetails = placeFactory.getPlace();
      scope.report = {
        "risk" : "Abuso",
        "date": "10/10/2016",
        "period": "Manhã"
      };
      scope.submit(true);
      scope.$apply();
      expect(scope.placeDetails.occurrences.length).toEqual(3);
      expect(scope.placeDetails.occurrences[2].count).toEqual(1);
    });

    it('should not redirect to the success page if address is empty', function() {
      createController();
      scope.submit(false);
      expect($location.path).not.toHaveBeenCalled();
    });
  });
  });
