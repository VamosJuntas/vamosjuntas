angular.module('vamosJuntas').directive('googleplace', function() {
    return {
        link: function(scope, element) {
            scope.gPlace = new google.maps.places.Autocomplete(element[0]);
        }
    }
});
