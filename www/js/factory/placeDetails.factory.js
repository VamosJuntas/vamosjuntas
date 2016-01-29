angular.module('vamosJuntas').factory('placeDetailsFactory', function() {
  var place = { report: { title: '' }};
	function fetchPlace() {
		place.report = {
			title: 'Parada da João Pessoa',
			reports: [
				{ category: 'Local deserto', occurrences: 3 },
				{ category: 'Mal iluminado', occurrences: 6 },
				{ category: 'Roubo', occurrences: 12 },
			]
		};
	}

	return {
		fetchPlace: fetchPlace,
		place: place
	};
});
