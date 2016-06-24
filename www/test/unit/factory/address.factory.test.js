describe('AddressFactory', function() {
  var addressFactory, httpBackend;
  var key = 'AIzaSyDNGPh2ERYJq9Ei1tzDSNG-nOyYAJVhpY4';

  beforeEach(function() {
      module('vamosJuntas');

      inject(function ($injector, $httpBackend) {
        httpBackend = $injector.get('$httpBackend');
        addressFactory = $injector.get('addressFactory');
        httpBackend.whenGET(/templates.*/).respond('');
      });
    }
  );
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
});
