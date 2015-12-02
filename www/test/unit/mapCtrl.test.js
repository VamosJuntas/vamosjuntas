describe('MapCtrl', function() {

  var cordovaGeolocation;

  beforeEach(function() {
    module('starter');

    inject(function($rootScope, $controller, $injector, $cordovaGeolocation) {
      var scope = $injector.get('$rootScope');
      cordovaGeolocation = $cordovaGeolocation;

      createController = function() {
          return $controller('MapCtrl', {
              '$scope': scope,
              '$state': {},
              '$cordovaGeolocation': cordovaGeolocation
            });
        };
    });
  });

  it('should get current position', function() {
    var promise = {then: function() {}}; spyOn(cordovaGeolocation, 'getCurrentPosition').and.returnValue(promise);
    var controller = createController();

    expect(cordovaGeolocation.getCurrentPosition).toHaveBeenCalled();

  });
});
