describe('HomeController', function() {
  var scope, placeFactory, state, place, responseData, occurrences, addressFactory, q, deferred, geolocationFactory, ionicLoading, occurrencesFactory;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, $q, $httpBackend, $ionicLoading) {
        scope = $rootScope.$new();
        httpBackend = $injector.get('$httpBackend');
        placeFactory = $injector.get('placeFactory');
        occurrencesFactory = $injector.get('occurrencesFactory');
        addressFactory = $injector.get('addressFactory');
        ionicLoading = $injector.get('$ionicLoading');
        geolocationFactory = $injector.get('geolocationFactory');
        q = $q;
        deferred = $q.defer();
        httpBackend.whenGET(/templates.*/).respond('');

        createController = function() {
          $controller('HomeController', {
            '$scope': scope,
            'placeFactory': placeFactory,
            'addressFactory': addressFactory,
            'occurrencesFactory': occurrencesFactory,
            'geolocationFactory': geolocationFactory,
            '$ionicLoading': ionicLoading
          });
        };
    });

    responseData = [
      {
          "_id": "594fd5dd6aa2cec76f591cd9",
          "updatedAt": "2017-06-25T15:25:17.331Z",
          "createdAt": "2017-06-25T15:25:17.331Z",
          "address": "R. Vicente da Fontoura, 2265 - Rio Branco, Porto Alegre - RS, 90640-002, Brazil",
          "geolocation": [
              -30.0422047,
              -51.1963351
          ],
          "category": "Local deserto",
          "__v": 0,
          "date": "2017-10-10T23:10:00.000Z"
      }
    ];

    place = {
      "address": "Av. Ipiranga",
      "location": {
        "latitude": 10,
        "longitude": 20
      },
      "occurrences": [{
        "risk": "Roubo",
        "numberOfOccurrences": 2,
        "reports": [
          {
          "date": "10/10/2016",
          "period": "Manhã"
        },
        {
          "date": "12/10/2016",
          "period": "Manhã"
        }]},
        {
          "risk": "Local Mal Iluminado",
          "numberOfOccurrences": 2,
          "reports": [
            {
            "date": "10/10/2016",
            "period": "Manhã"
          },
          {
            "date": "12/10/2016",
            "period": "Manhã"
          }]
      }]
    };

    occurrences = [place];

    spyOn(placeFactory, 'fetchPlaces').and.callFake(function() {
      return {
        then: function(callback) {
          return callback({
            data: responseData
          });
        }
      };
    });

    spyOn(addressFactory, 'getAddressByCoord').and.returnValue(q.when('Av. Ipiranga, 6681'));

    spyOn(occurrencesFactory, 'build').and.returnValue(occurrences);

    spyOn(geolocationFactory, 'getCurrentPosition').and.returnValue(deferred.promise);

  });

  it('should get info for a specific place', function() {
    spyOn(placeFactory, 'addPlace');

    createController();
    scope.getSpecificPlace(place);

    expect(placeFactory.addPlace).toHaveBeenCalledWith(place);
  });

  it('should get a total of occurrences from a specific place', function() {
    createController();
    expect(scope.getTotalOfOccurrences(place)).toBe(4);
  });

  describe('get successfully current position', function (){
    beforeEach(function () {
       deferred.resolve({
        coords: {
          latitude: -30.057977,
          longitude: -51.1755227
        }
      });
    });

    it('should show the current position', function () {
      var posOptions = {timeout: 5000, enableHighAccuracy: false};

      createController();
      scope.$apply();
      expect(geolocationFactory.getCurrentPosition).toHaveBeenCalledWith(posOptions);
    });

    it('gets the risk places', function() {
      createController();
      scope.$apply();
      expect(placeFactory.fetchPlaces).toHaveBeenCalledWith(-30.057977, -51.1755227);
    });

    it('builds occurrences from response data', function() {
      createController();
      scope.$apply();
      expect(occurrencesFactory.build).toHaveBeenCalledWith(responseData);
    });

    it('gets the address by coords', function() {
      createController();
      scope.$apply();
      expect(addressFactory.getAddressByCoord).toHaveBeenCalledWith(-30.057977, -51.1755227);
      expect(scope.search.text).toBe('Av. Ipiranga, 6681');
    });
  });


  describe('fails to get current position', function () {
    beforeEach(function () {
      deferred.reject();
    });

    it('should not show the current position', function () {
      createController();
      scope.$apply();
      expect(scope.errorMessage).toBe(true);
    });

    it('should not get the risk places and address', function() {
      createController();
      scope.$apply();
      expect(placeFactory.fetchPlaces).not.toHaveBeenCalled();
      expect(addressFactory.getAddressByCoord).not.toHaveBeenCalled();
    });
  });
});
