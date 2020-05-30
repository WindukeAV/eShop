'use strict';

function MapController() {
	this.shops = [
		{
			id: 0,
			coordinates: [59.8932, 30.3495]
		},
		{	id: 1,
			coordinates: [59.8932, 30.3595]
		}
	];
	
	var myMap;

	this.initMap = function(map) {


		ymaps.ready(function() {

			myMap = new ymaps.Map(map, {
				center: [59.8932, 30.3495],
				zoom: 16,
			});

			for(var i = 0; i < this.shops.length; i++) {
				
				var point = new ymaps.GeoObject({
					
					geometry: {
						id: this.shops[i].id,
						type: 'Point',
						coordinates: this.shops[i].coordinates,
					}
				});

				 console.log(this.shops[1].coordinates);
				 console.log(getShopsById.bind(this)(1));
				 
				myMap.geoObjects.add(point);
			}
		}.bind(this));
	}

	this.getShopsById = (function(id) {
		for (var i = 0; i < this.shops.length; i++) {
			if (this.shops[i].id === id) {
				return this.shops[i].coordinates;
			}
		}
	}).bind(this);

	this.setCenter = function() {
		myMap.setCenter(getShopsById(1).bind(this));
	}
}
