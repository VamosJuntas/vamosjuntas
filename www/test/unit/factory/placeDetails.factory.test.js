describe('placeDetailsFactory', function() {
  var placeDetailsFactory;

  beforeEach(function() {
      module('vamosJuntas');
      inject(function (_placeDetailsFactory_) {
        placeDetailsFactory = _placeDetailsFactory_;
      });
  });

  it('should retrieve the place', function(){
    placeDetailsFactory.fetchPlace();
    expect(placeDetailsFactory.place.report.title).toBe('Parada da João Pessoa');
  });
});
