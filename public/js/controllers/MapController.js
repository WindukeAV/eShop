function MapController(containerNode) {
	
	MapView.call(this, containerNode);

	this.map = this.getComponentById('map__');

	ymaps.ready(function () {
		var myMap = new ymaps.Map("YMapsID", {
		center: [59.89318,30.34857],
		zoom: 16,
		});
		
		var myGeoObject = new ymaps.GeoObject({
			geometry: {
				type: "Point",
				coordinates: [59.89318,30.34857] 
			}
		});
	
		myMap.geoObjects.add(myGeoObject); 
	});	
}
