angular.module('vamosJuntas').directive('googleplace', function() {
    return {
        link: function(scope, element) {
            var autocomplete = new google.maps.places.Autocomplete(element[0]);
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();

                scope.search.text = place.formatted_address;
                scope.search.latitude = place.geometry.location.lat();
                scope.search.longitude = place.geometry.location.lng();

                console.log("address", place.formatted_address);
                console.log("lat", place.geometry.location.lat());
                console.log("lng", place.geometry.location.lng());

                scope.$apply();
            });
        }
    };
});
