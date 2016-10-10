angular.module('vamosJuntas').directive('googleplace', function() {
    return {
        link: function(scope, element) {
            var autocomplete = new google.maps.places.Autocomplete(element[0]);
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            scope.search.text = place.formatted_address;
            scope.$apply();
          });
        }
    }
});
