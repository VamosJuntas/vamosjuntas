// describe('ReportAddressController', function() {
//
//   beforeEach(function() {
//     module('vamosJuntas');
//     inject(function($rootScope, $controller, $injector, $httpBackend, _$location_) {
//       scope = $rootScope.$new();
//       $location = _$location_;
//       $httpBackend.whenGET(/templates.*/).respond('');
//
//       spyOn($location, 'path');
//       createController = function(stateParams) {
//         var $stateParams;
//         var defaultStateParams = {
//           address: ''
//         };
//         if (stateParams === undefined) {
//           $stateParams = defaultStateParams;
//         } else {
//           $stateParams = stateParams;
//         }
//
//         $controller('ReportAddressController', {
//           '$scope': scope,
//           '$location': $location,
//           '$stateParams': $stateParams
//         });
//       };
//     });
//
//     place = {
//       "address": "Av. Ipiranga",
//       "location": {
//         "latitude": 10,
//         "longitude": 20
//       },
//       "occurrences": [{
//         "risk": "Roubo",
//         "count": 2,
//         "reports": [{
//           "date": "10/10/2016",
//           "period": "Manhã"
//         }, {
//           "date": "12/10/2016",
//           "period": "Manhã"
//         }]
//       }, {
//         "risk": "Local Mal Iluminado",
//         "count": 2,
//         "reports": [{
//           "date": "10/10/2016",
//           "period": "Manhã"
//         }, {
//           "date": "12/10/2016",
//           "period": "Manhã"
//         }]
//       }]
//     };
//     spyOn(placeFactory, 'getPlace').and.callThrough();
//     spyOn(placeFactory, 'getPlace').and.returnValues(place);
//   });
// });
describe('ReportAddressController', function() {
  var scope, state, $location, placeFactory, place;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, $httpBackend, _$location_) {
        scope = $rootScope.$new();
        $location = _$location_;
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
  });

    describe('Saving data', function() {
      it('should save a new occurrence for existent risk', function() {
        createController();
        scope.placeDetails = place;
        scope.report = {
          "risk": "Roubo",
          "date": "10/10/2016",
          "period": "Manhã"
        };
        scope.submit(true);
        scope.$apply();
        expect(scope.placeDetails.occurrences[0].count).toEqual(3);
      });

      it('should save a new occurrence for a non existent risk', function() {
        createController();
        scope.placeDetails = place;
        scope.report = {
          "risk": "Abuso",
          "date": "10/10/2016",
          "period": "Manhã"
        };
        scope.submit(true);
        scope.$apply();
        expect(scope.placeDetails.occurrences.length).toEqual(3);
        expect(scope.placeDetails.occurrences[2].count).toEqual(1);
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
