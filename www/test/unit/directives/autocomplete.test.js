describe('Unit testing autocomplete', function() {
    var $compile,
        scope;

    beforeEach(function() {
        module('vamosJuntas');

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            scope = _$rootScope_.$new();
        });
    });

    it('Replaces the element with the appropriate content', function() {
        spyOn(google.maps.places, 'Autocomplete');

        $compile('<input googleplace/>')(scope);

        expect(google.maps.places.Autocomplete).toHaveBeenCalled();
    });
});
