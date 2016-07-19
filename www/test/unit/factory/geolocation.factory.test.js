describe('Geolocation Factory', function() {
  var geolocationFactory, cordovaGeolocation, q;

  beforeEach(function() {
    module('vamosJuntas');
    module('ngCordova');

    inject(function($injector, $q, $cordovaGeolocation) {
      q = $q;
      geolocationFactory = $injector.get('geolocationFactory');
      cordovaGeolocation = $cordovaGeolocation;
    });
  });

  it('should return the curretn position', function() {
    var position = {
      coords: {
        latitude: 1.5,
        longitude: 1.6
      }
    };

    spyOn(cordovaGeolocation, 'getCurrentPosition').and.returnValue(q.when(position));
    geolocationFactory.getCurrentPosition();
    expect(cordovaGeolocation.getCurrentPosition).toHaveBeenCalled();
  });
});
