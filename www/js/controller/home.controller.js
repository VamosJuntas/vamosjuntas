  var homeController = angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory',  function($scope, placeFactory, addressFactory) {
     placeFactory.fetchPlaces().then(function(response) {
       $scope.places = response.data;
     });

 $scope.search = {};

  $scope.getTotalOfOccurrences = function(place) {
     var numberOfOccurrences = place.occurrences.reduce(function(total, occurrence) {
       return total + occurrence.numberOfOccurrences;
    }, 0);

    return numberOfOccurrences;
   };

   $scope.getSpecificPlace = function(place) {
    placeFactory.addPlace(place);
   };
   
//
//   /!*$scope.searchAddress = function() {
//     addressFactory.getAutoCompleteFromAddress($scope.search.text).then(function(response) {
//       $scope.addresses = response.data.predictions;
//     }, function(error) {
//       $scope.addresses = [];
//     });
//   };*!/
//
//   $scope.confirmAddress = function (place) {
//     $scope.search.text = place.description;
//   }
 }]);


  homeController.directive('googleplace', function() {
    return {
        link: function(scope, element, attrs) {
            var options = {
                types: []
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
            element.blur(function(e) {
                window.setTimeout(function() {
                    angular.element(element).trigger('input');
                }, 0);
            });
        }

    }
}
);



