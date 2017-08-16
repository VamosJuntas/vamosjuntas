describe('placeDetailsController', function() {
  var scope;
  var placeFactory;
  var $location;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function($rootScope, $controller, $injector, $httpBackend, _$location_) {
      scope = $rootScope.$new();
      $location = _$location_;
      placeFactory = $injector.get('placeFactory');
      spyOn($location, 'path');
      createController = function() {
        $controller('placeDetailsController', {
          '$scope': scope,
          'placeFactory': placeFactory,
          '$location': $location
        });
      };
    });

    var occurrences = [
      {
        risk: 'Roubo',
        numberOfOccurrences: 2,
        reports: [{}, {}],
      },
      {
        risk: 'Local Mal Iluminado',
        numberOfOccurrences: 2,
        reports: [{}, {}],
      },
    ];

    var places = [
      {title: 'Parada da João Pessoa, 1234', occurrences: occurrences},
      {title: 'Avenida Ipiranga, 6681', occurrences: occurrences},
    ];

    spyOn(placeFactory, 'getPlace').and.returnValue({title: 'Parada da João Pessoa', occurrences: occurrences});
  });

  it('gets the places from the placesFactory', function() {
    createController();
    expect(placeFactory.getPlace).toHaveBeenCalled();
  });

  it('should get a place', function() {
    createController();
    expect(scope.placeDetails.occurrences.length).toBe(2);
  });

  it('should redirect to report page', function() {
    var placeController = createController();
    scope.submit();
    expect($location.path).toHaveBeenCalledWith('/report');
  });

  it('gets all the occurrences in an array when the controller is created', function() {
    var placeController = createController();
    expect(scope.allOccurrences).toEqual([{ risk: 'Roubo', reports: [{}, {}] }, { risk: 'Local Mal Iluminado', reports: [{}, {}] }]);
  });

});
