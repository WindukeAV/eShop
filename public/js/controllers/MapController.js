'use strict';

function MapController() {

	var myMap;

	this.initMap = function(mapNode) {			
		
		ymaps.ready(function () {
			
			myMap = new ymaps.Map(mapNode, {
				center: [59.8932, 30.3495],
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
			myMap.geoObjects.add(myGeoObject2);			
		});

		this.settingCenter = function(coordinates) {
			this.myMap = myMap;			
			this.coordinates = coordinates;
	
			myMap.setCenter([59.8943, 30.35956], 16, {});	
			this.coordinates.addEventListener('click', settingCenter)
		}
	}
}
