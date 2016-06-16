describe('HomeController', function() {
  var scope, placeFactory, state, place, addressFactory, q, deferred, cordovaGeolocation;

  beforeEach(function() {
    module('vamosJuntas');

    cordovaGeolocation = {
      getCurrentPosition: function() {
        return {
          then: function(){}
        }
      }
    };

    inject(function ($rootScope, $controller, $injector, $q, $httpBackend) {
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
              'addressFactory': addressFactory,
              '$cordovaGeolocation': cordovaGeolocation
          });
        };
    });

    place = {
      "title": "Chafariz da Redenção",
      "occurrences": [{
        "address": "Avenida Ipiranga",
        "risk": "Local Deserto",
        "date": "10/10/2015",
        "period": "Manhã",
        "numberOfOccurrences": 3
      }, {
        "address": "Avenida Ipiranga",
        "risk": "Mal Iluminado",
        "date": "10/10/2015",
        "period": "Manhã",
        "numberOfOccurrences": 4
      }, {
        "address": "Avenida Ipiranga",
        "risk": "roubo",
        "date": "10/10/2015",
        "period": "Manhã",
        "numberOfOccurrences": 10
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

  it('should get a total of occurrences from a specific place', function() {
    createController();
    expect(scope.getTotalOfOccurrences(place)).toBe(17);
  });

  it('should search the address', function() {
    spyOn(addressFactory, 'getAutoCompleteFromAddress').and.returnValue(deferred.promise);

    deferred.resolve({
      data: {
        predictions: [
          {
            description: 'Rua Dom Pedro I - São Paulo'
          },
          {
            description: 'Rua Dom Pedro II - Porto Alegre'
          }
        ]
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
    var place = {description: 'Av. Ipiranga, 123 - Porto Alegre'}
    createController();
    scope.confirmAddress(place);
    scope.$apply();
    expect(scope.search.text).toBe('Av. Ipiranga, 123 - Porto Alegre');
  });

  it('should get the current position', function () {
    spyOn(cordovaGeolocation, 'getCurrentPosition').and.returnValue(deferred.promise);

     deferred.resolve({
      coords: {
        latitude: -30.057977,
        longitude: -51.1755227
      }
    });

    createController();
    scope.$apply();
    expect(scope.latitude).toBe(-30.057977);
    expect(scope.longitude).toBe(-51.1755227);
  });

});
