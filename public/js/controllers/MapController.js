function MapController(containerNode) {

	MapView.call(this, containerNode);

	this.map__ = this.getComponentById('map');
	
	
	
	function init() {
		ymaps.ready(function () {		
			var myMap = new ymaps.Map("map__", {
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

}
