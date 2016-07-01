angular.module('vamosJuntas').directive('googleplace', function() {
    return {
        link: function(scope, element) {
            new google.maps.places.Autocomplete(element[0]);
        }
    }
});
