describe('AddressFactory', function() {
  var addressFactory, httpBackend, geocoderSpy, scope;
  var key = 'AIzaSyDNGPh2ERYJq9Ei1tzDSNG-nOyYAJVhpY4';

  beforeEach(function() {
      module('vamosJuntas');

      inject(function ($injector, $httpBackend, $rootScope) {
        httpBackend = $injector.get('$httpBackend');
        addressFactory = $injector.get('addressFactory');
        scope = $rootScope;
        httpBackend.whenGET(/templates.*/).respond('');
      });

      geocoderSpy = jasmine.createSpyObj('Geocoder', ['geocode']);
      spyOn(google.maps, 'Geocoder').and.returnValue(geocoderSpy);
    }
  );

  it('should return autocomplete address from an address', function() {
    var url = 'mapsAPIStub/autocomplete/json?input=Av. Ipiranga&key=' + key;
    var httpResponse = {id: '1', description: 'Av Ipiranga, Porto Alegre' };
    var result;

    httpBackend.whenGET(url).respond(httpResponse);

    addressFactory.getAutoCompleteFromAddress('Av. Ipiranga').then(function (data){
      result = data;
    });
    httpBackend.expectGET(url);
    httpBackend.flush();
    expect(result.data.description).toBe('Av Ipiranga, Porto Alegre');
  });

  it('should return coord from a address id', function() {
    var url = 'mapsAPIStub/details/json?placeid=EjhBdi4gSXBpcmFuZ2EgLSBQcmFpYSBkZSBCZWxhcywgUG9ydG8gQWxlZ3JlIC0gUlMsIEJyYXppbA&key=' + key;
    var httpResponse = { geometry: {
         location: {
            lat: -30.0556739,
            lng: -51.1881215
         }
      }
    };
    var result;

    httpBackend.whenGET(url).respond(httpResponse);

    addressFactory.getCoordFromAddress('EjhBdi4gSXBpcmFuZ2EgLSBQcmFpYSBkZSBCZWxhcywgUG9ydG8gQWxlZ3JlIC0gUlMsIEJyYXppbA').then(function (data){
      result = data;
    });
    httpBackend.expectGET(url);
    httpBackend.flush();
    expect(result.data.geometry.location.lat).toBe(-30.0556739);
  });

  it('should return places near address from coords', function() {
    var url = 'mapsAPIStub/nearbysearch/json?location=-30.0556739,-51.1881215&radius=300&language=pt-PT&key=' + key;
    var httpResponse = {name: 'Bourbon Shopping'};
    var result;

    httpBackend.whenGET(url).respond(httpResponse);

    addressFactory.getNearbyAddresses(-30.0556739, -51.1881215).then(function (data){
      result = data;
    });
    httpBackend.expectGET(url);
    httpBackend.flush();
    expect(result.data.name).toBe('Bourbon Shopping');
  });

  it('should return address from coords', function () {
    var result;

    geocoderSpy.geocode.and.callFake(function(request, callback) {
        callback([{
          formatted_address: 'Av. Ipiranga, 6681'
        }], google.maps.GeocoderStatus.OK);
    });

    addressFactory.getAddressByCoord(-30.0556739, -51.1881215).then(function (data) {
      result = data;
    });

    scope.$apply();

    expect(result).toBe('Av. Ipiranga, 6681');

  });

  it('should not return address from coords', function () {
    var result;

    geocoderSpy.geocode.and.callFake(function(request, callback) {
        callback([], google.maps.GeocoderStatus.ZERO_RESULTS);
    });

    addressFactory.getAddressByCoord(-30.0556739, -51.1881215).then(function (data) {
      result = data;
    }).catch(function (error) {
      result = error;
    });

    scope.$apply();

    expect(result).toBe('ZERO_RESULTS');

  });
});
