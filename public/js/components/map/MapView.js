'use strict';

function MapView(containerNode) {
	View.call(this, containerNode);
	this.mapController = new MapController(this);
	
	this.Shops = this.mapController.ShopsFromModel

	var maps = this.getChildById('ymaps-container');

	this.mapController.initMap(maps);
	this.buttonsContainer = this.getChildById('buttons-container');	
	this.setCenter = (function (index) {
		this.mapController.centerMapToShopById(this.Shops[index].id);
	}).bind(this);

	this.makeShopButtonListener = (function (index) {
		return (
			function () {
				this.setCenter(index);
			}
		).bind(this);
	}).bind(this);
	
	for (var i = 0; i < this.Shops.length; i++) {
		var shop = this.Shops[i];
		var buttonClickListener = this.makeShopButtonListener(i);
		var button = document.createElement('button');

		button.innerText = shop.title;
		button.addEventListener('click', buttonClickListener);

		this.buttonsContainer.appendChild(button);
	}
}


function MapController() {
	
	this.mapModel = new MapModel();
	this.ShopsFromModel = this.mapModel.data
	
	var myMap;

	this.initMap = function(map) {
		ymaps.ready(function() {
			myMap = new ymaps.Map(map, {
				center: [59.8932, 30.3495],
				zoom: 16,
			});

			for(var i = 0; i < this.ShopsFromModel.length; i++) {
				var point = new ymaps.GeoObject({
					geometry: {
						type: 'Point',
						coordinates: this.ShopsFromModel[i].coordinates,
					}
						
				});

				myMap.geoObjects.add(point);
			}
		}.bind(this));
	};

	this.getShopsById = (function(id) {
		for (var i = 0; i < this.ShopsFromModel.length; i++) {
			if (this.ShopsFromModel[i].id === id) {
				return this.ShopsFromModel[i];
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

function MapModel() {	
	
	this.data = [
		{
			id: 0,
			title: 'Kek',
			coordinates: [59.8932, 30.3495],
		},
		{
			id: 1,
			title: 'Lol',
			coordinates: [59.8932, 30.3595],
		}
	];
}

function Model() {
	var subject = new Subject();
	this.subscribe = subject.subscribe;
	this.unsubscribe = subject.unsubscribe;
	this.getdata = subect.getdata;

	subject.subscribe(counter);

	
	
}
