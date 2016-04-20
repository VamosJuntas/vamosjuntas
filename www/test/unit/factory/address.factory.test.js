describe('AddressFactory', function() {
  var addressFactory, $httpBackend;

  beforeEach(function() {
      module('vamosJuntas');

      inject(function ($injector, $httpBackend) {
        $httpBackend = $injector.get('$httpBackend');
        addressFactory = $injector.get('addressFactory');

        googleApiHandler = $httpBackend.when('GET', 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Av.%20Ipiranga&key=AIzaSyDNGPh2ERYJq9Ei1tzDSNG-nOyYAJVhpY4')
                            .respond({id: '1'});
      });
    }
  );

  it('should return id from Place', function() {
    var url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Av.%20Ipiranga&key=AIzaSyDNGPh2ERYJq9Ei1tzDSNG-nOyYAJVhpY4';
    var httpResponse = {id: '1' };
    var result;
    $httpBackend.expectGET(url);
    addressFactory.getIdFromPlace('Av. Ipiranga').then(function(data){
      result = data;
    });

    $httpBackend.flush();
    expect(result).toBe(httpResponse);
  });

});
