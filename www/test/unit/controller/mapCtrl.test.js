describe('MapController', function() {

  var cordovaGeolocation,
      createController,
      scope,
      successCallback,
      position,
      promise;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, $cordovaGeolocation, $httpBackend) {
      $httpBackend.whenGET('templates/splash.html').respond({});
      $httpBackend.whenGET('templates/confirmation.html').respond({});
      $httpBackend.whenGET('templates/map.html').respond({});

      scope = $injector.get('$rootScope');
      cordovaGeolocation = $cordovaGeolocation;

      createController = function() {
        $controller('MapController', {
            '$scope': scope,
            '$state': {},
            '$cordovaGeolocation': cordovaGeolocation
        });
        scope.$root.$digest();
      };
    });

    position = {
      coords: {
        latitude: 2,
        longitude: 3
      }
    };

    promise = {
      then: function(success, failure) {
            successCallback = success;
            failureCallback = failure;
      }
    };
    spyOn(cordovaGeolocation, 'getCurrentPosition').and.returnValue(promise);
  });

  it('gets current position', function() {
    createController();

    expect(cordovaGeolocation.getCurrentPosition).toHaveBeenCalled();
  });

  describe('successfully get a position', function() {
    beforeEach(function() {
      createController();
      successCallback(position);
    });

    it('sets map', function () {
      expect(scope.map).toEqual({zoom:15,center:{latitude:2, longitude:3}});
    });

    it('sets marker', function() {
      expect(scope.marker).toEqual({
        id: 1,
        coords: {
          latitude: 2,
          longitude: 3
        }
      });
    });
  });

  describe('fail successfully to get a position', function() {
    it('logs error message', function() {
      spyOn(console, 'log');

      createController();
      failureCallback();

      expect(console.log).toHaveBeenCalledWith('Could not get location');
    });
  });
});
