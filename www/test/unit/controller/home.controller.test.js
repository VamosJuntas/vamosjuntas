describe('HomeController', function() {
  var scope, placeFactory, addressFactory, q, deferred;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function ($rootScope, $controller, $injector, $q, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $injector.get('$httpBackend');
        placeFactory = $injector.get('placeFactory');
        addressFactory = $injector.get('addressFactory');
        q = $q;
        deferred = $q.defer();
        httpBackend.whenGET(/templates.*/).respond('');

        createController = function() {
          $controller('HomeController', {
              '$scope': scope,
              'placeFactory': placeFactory,
              'addressFactory': addressFactory
          });
        };
    });

    spyOn(placeFactory, 'fetchPlaces');
  });

  it('gets the risk places', function() {
    createController();
    expect(placeFactory.fetchPlaces).toHaveBeenCalled();
  });

  it('should search the address', function() {
    spyOn(addressFactory, 'getAutocomleteFromAddress').and.returnValue(deferred.promise);
    deferred.resolve([{ id: 1 }, { id: 2 }]);
    scope.$apply();

    createController();
    scope.search.text = 'Rua Dom Pedro';
    scope.searchAddress();
    expect(addressFactory.getAutocomleteFromAddress).toHaveBeenCalledWith('Rua Dom Pedro');
    //expect(scope.addresses).toHaveBeenCalledWith('Rua Dom Pedro');
  });

});
