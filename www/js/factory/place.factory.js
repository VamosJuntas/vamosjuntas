angular.module('vamosJuntas').factory('placeFactory', [function(){
	var places = {
		myPlaces: ['initialPlace']
	};

	return {
		fetchPlaces: function () {
			places.myPlaces = ['teste1', 'teste2'];
			console.log('fetch');
		},
		places: places
	};
}]);