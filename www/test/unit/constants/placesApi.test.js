describe('PlacesAPI constant', function() {
  var PlacesAPI;

  beforeEach(function() {
    module('vamosJuntas');
    inject(function($injector) {
      PlacesAPI = $injector.get('PlacesAPI');
    });

  });

  it('should be defined', function() {
    expect(PlacesAPI).toBeDefined();
  });

  it('should have a autoCompleteBaseUrl property', function() {
    expect(PlacesAPI.autoCompleteBaseUrl).toBe('mapsAPIStub/autocomplete/json?');
  });

  it('should have a coordinatesBaseUrl property', function() {
    expect(PlacesAPI.coordinatesBaseUrl).toBe('mapsAPIStub/details/json?');
  });

  it('should have a nearbySearchBaseUrl property', function() {
    expect(PlacesAPI.nearbySearchBaseUrl).toBeDefined('mapsAPIStub/nearbysearch/json?');
  });


});
