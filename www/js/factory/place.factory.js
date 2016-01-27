angular.module('vamosJuntas').factory('placeFactory', [function(){
	var places;

	return {
		fetchPlaces: function () {
			places = ['teste1', 'teste2'];
			console.log('fetch');
		},
		myPlaces: places
	};
}]);