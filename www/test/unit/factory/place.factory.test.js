describe('Place Factory', function() {
  var placeFactory, httpBackend, httpResponse;

  beforeEach(function() {
    module('vamosJuntas');

    inject(function($injector, $httpBackend) {
      httpBackend = $injector.get('$httpBackend');
      placeFactory = $injector.get('placeFactory');
      httpBackend.whenGET(/templates.*/).respond('');
    });

    httpResponse = {
      "title": "Chafariz da Redenção",
      "occurrences": [{
        "address": "Avenida Ipiranga",
        "risk": "Local Deserto",
        "date": "10/10/2015",
        "period": "Manhã",
        "numberOfOccurrences": 3
      }, {
        "address": "Avenida Ipiranga",
        "risk": "Mal Iluminado",
        "date": "10/10/2015",
        "period": "Manhã",
        "numberOfOccurrences": 4
      }, {
        "address": "Avenida Ipiranga",
        "risk": "roubo",
        "date": "10/10/2015",
        "period": "Manhã",
        "numberOfOccurrences": 10
      }]
    };
  });

  it('should return places', function() {
    var url, result;
    url = 'http://0.0.0.0:3001/reports/-30.057977,-30.0123';

    httpBackend.whenGET(url).respond(httpResponse);

    placeFactory.fetchPlaces(-30.057977, -30.0123).then(function(response) {
      result = response.data;
    });

    httpBackend.expectGET(url);
    httpBackend.flush();
    expect(result).toEqual(httpResponse);
  });

  it('should add a place and return', function() {
    placeFactory.addPlace(httpResponse);
    expect(placeFactory.getPlace()).toBe(httpResponse);
  });
});
