'use strict';

function MapController() {
	this.shops = [
		{
			id: 0,
			title: 'Kek',
			coordinates: [59.8932, 30.3495]
		},
		{
			id: 1,
			title: 'Lol',
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
						type: 'Point',
						coordinates: this.shops[i].coordinates,
					}
				});

				myMap.geoObjects.add(point);
			}
		}.bind(this));
	};

	this.getShopsById = (function(id) {
		for (var i = 0; i < this.shops.length; i++) {
			if (this.shops[i].id === id) {
				return this.shops[i];
			}
		}

		return null;
	}).bind(this);

	this.centerMapToShopById = (function(id) {
		var shop = this.getShopsById(id);

		if (shop) {
			myMap.setCenter(shop.coordinates);
		}
	}).bind(this);
}
