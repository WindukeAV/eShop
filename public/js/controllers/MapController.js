function MapController() {

	this.initMap = function(mapNode) {
		ymaps.ready(function () {
			var myMap = new ymaps.Map(mapNode, {
				center: [59.8931, 30.34857],
				zoom: 16,
			});

			var myGeoObject = new ymaps.GeoObject({
				geometry: {
					type: "Point",
					coordinates: [59.8931, 30.34857]
				}
			});

			

			myMap.geoObjects.add(myGeoObject);
		});
	}
}