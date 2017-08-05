describe('OcurrencesFactory', function() {
  var occurencesFactory;
  var addressDescription = "Number 4, Privet Drive, Little Whinging";
  var reports = [
    {
      address: addressDescription,
      category: 'Roubo',
      date: "2017-10-10T21:10:00.000Z"
    },
    {
      address: addressDescription,
      category: 'Roubo',
      date: "2017-10-10T22:10:00.000Z"
    },
    {
      address: addressDescription,
      category: 'Assalto',
      date: "2017-10-10T23:10:00.000Z"
    },
    {
      address: "Number 12, Grimmauld Place",
      category: 'Latrocinio',
      date: "2017-10-10T24:10:00.000Z"
    }
  ];

  beforeEach(function() {
      module('vamosJuntas');

      inject(function ($injector, $rootScope) {
        occurrencesFactory = $injector.get('occurrencesFactory');
      });
    }
  );

  it('should group two reports with the same address', function() {
    var result = occurrencesFactory.build(reports);

    expect(result.length).toBe(2);
  })

  it('should group two occurrences in the same address', function() {
    var result = occurrencesFactory.build(reports);

    expect(result[0].occurrences.length).toBe(2);
    expect(result[0].occurrences).toContain({
      numberOfOccurrences: 2,
      risk: 'Roubo',
      reports: [
        {
          date: "2017-10-10T21:10:00.000Z"
        },
        {
          date: "2017-10-10T22:10:00.000Z"
        }
      ]
    });
    expect(result[0].occurrences).toContain({
      numberOfOccurrences: 1,
      risk: 'Assalto',
      reports: [
        {
          date: "2017-10-10T23:10:00.000Z"
        }
      ]
    });

    expect(result[1].occurrences.length).toBe(1);
    expect(result[1].occurrences).toContain({
      numberOfOccurrences: 1,
      risk: 'Latrocinio',
      reports: [
        {
          date: "2017-10-10T24:10:00.000Z"
        }
      ]
    });
  });
});
