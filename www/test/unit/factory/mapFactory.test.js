describe('MapFactory', function() {
  var mapFactory, $cordovaGeolocation;

  beforeEach(function() {
    module('vamosJuntas');
    inject(function(_mapFactory_, _$cordovaGeolocation_) {
      $cordovaGeolocation = _$cordovaGeolocation_;
      mapFactory = _mapFactory_;
    });
  });

  it('should return current position', function() {
    var promise = {
      then : function(success) {
        success('fake-position');
      }
    };
    spyOn($cordovaGeolocation, 'getCurrentPosition').and.returnValue(promise);
    var options = {timeout: 10000, enableHighAccuracy: true};

    mapFactory.getPosition(options);
    expect($cordovaGeolocation.getCurrentPosition).toHaveBeenCalledWith(options);
    expect(mapFactory.position).toBe('fake-position');
  });
});
