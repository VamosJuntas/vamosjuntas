describe('Place Factory', function() {
  var placeFactory, httpBackend, httpResponse;

  beforeEach(function() {
      module('vamosJuntas');

      inject(function ($injector, $httpBackend) {
        httpBackend = $injector.get('$httpBackend');
        placeFactory = $injector.get('placeFactory');
        httpBackend.whenGET(/templates.*/).respond('');
      });

      httpResponse = place = {
        "title": "Chafariz da Redenção",
        "occurrences": [{
            "risk": "Local Deserto",
            "date": "10/10/2015",
            "period":"Manhã",
            "numberOfOccurrences": 3
          }, {
            "risk": "Mal Iluminado",
            "date": "10/10/2015",
            "period":"Manhã",
            "numberOfOccurrences": 6
          }, {
            "risk": "roubo",
            "date": "10/10/2015",
            "period":"Manhã",
            "numberOfOccurrences": 6
          }
        ]
      };
    }
  );

  it('should return places', function() {
    var url = 'http://localhost:3000/places';
    var result;

    httpBackend.whenGET(url).respond(httpResponse);

    placeFactory.fetchPlaces().then(function (response) {
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
