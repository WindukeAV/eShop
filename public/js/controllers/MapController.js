function MapController() {

	this.initMap = function(mapNode) {
		
		ymaps.ready(function () {
			var myMap = new ymaps.Map(mapNode, {
				center: function() {
					for (var i = 0; i < COORDINATES.length; i++) {
				
						var COORDINATES = {
							'center_1': [59.8932, 30.3495],
							'center_2': [59.8943, 30.35956],
						}		
						var coordinatesElement = COORDINATES[i]
						var view = COORDINATES[coordinatesElement];
						
					}
				
					if(view === 'center_1') {
						
					}
				},
				zoom: 16,
				}				
			);
			


			var myGeoObject = new ymaps.GeoObject({
				geometry: {
					type: "Point",
					coordinates: [59.8932, 30.3495]
				}
			});

			var myGeoObject2 = new ymaps.GeoObject({
				geometry: {
					type: "Point",
					coordinates: [59.8943, 30.35956]
				}
			});			

			myMap.geoObjects.add(myGeoObject);
			myMap2.geoObjects.add(myGeoObject2);
		});
	}

	this.buttonClick = function(container) {
		this.container = container;

		function onClick() {
			console.log('click')
		};

		this.container.addEventListener('click', onClick);
	}
}
