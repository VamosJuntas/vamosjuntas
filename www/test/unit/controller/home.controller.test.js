describe('HomeController', function() {
  var scope, placeFactory, state, place, addressFactory, q, deferred;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function($rootScope, $controller, $injector, $q, $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $injector.get('$httpBackend');
      placeFactory = $injector.get('placeFactory');
      addressFactory = $injector.get('addressFactory');
      q = $q;
      deferred = $q.defer();
      httpBackend.whenGET(/templates.*/).respond('');

      createController = function() {
        $controller('HomeController', {
          '$scope': scope,
          'placeFactory': placeFactory,
          'addressFactory': addressFactory
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
        "count": 5,
        "reports": [{
          "date": "10/10/2016",
          "period": "Manhã"
        }, {
          "date": "12/10/2016",
          "period": "Manhã"
        }]
      }, {
        "risk": "Local Mal Iluminado",
        "count": 3,
        "reports": [{
          "date": "10/10/2016",
          "period": "Manhã"
        }, {
          "date": "12/10/2016",
          "period": "Manhã"
        }]
      }]
    };

    spyOn(placeFactory, 'fetchPlaces').and.callFake(function() {
      return {
        then: function(callback) {
          return callback(place);
        }
      };
    });
  });

  it('gets the risk places', function() {
    createController();
    expect(placeFactory.fetchPlaces).toHaveBeenCalled();
  });

  it('get all the occurrences', function() {
    createController();
    expect(scope.getTotalOfOccurrences(place)).toBe(8);
  });

  it('should search the address', function() {
    spyOn(addressFactory, 'getAutoCompleteFromAddress').and.returnValue(deferred.promise);

    deferred.resolve({
      data: {
        predictions: [{
          description: 'Rua Dom Pedro I - São Paulo'
        }, {
          description: 'Rua Dom Pedro II - Porto Alegre'
        }]
      }
    });

    createController();
    scope.search.text = 'Rua Dom Pedro';
    scope.searchAddress();

    scope.$apply();
    expect(addressFactory.getAutoCompleteFromAddress).toHaveBeenCalledWith('Rua Dom Pedro');
    expect(scope.addresses[0].description).toBe('Rua Dom Pedro I - São Paulo');
  });

  it('should not search the address', function() {
    spyOn(addressFactory, 'getAutoCompleteFromAddress').and.returnValue(deferred.promise);

    deferred.reject();

    createController();
    scope.search.text = 'Rua Dom Pedro';
    scope.searchAddress();

    scope.$apply();
    expect(scope.addresses.length).toBe(0);
  });

  it('should fill the search with the selected address', function() {
    var place = {
      description: 'Av. Ipiranga, 123 - Porto Alegre'
    };
    createController();
    scope.confirmAddress(place);
    scope.$apply();
    expect(scope.search.text).toBe('Av. Ipiranga, 123 - Porto Alegre');
  });
});
