'use strict';

function Map(containerNode) {
	View.call(this, containerNode);
	
	this.mapController = new MapController(this);
	var maps = this.getChildById('ymaps-container');
	
	this.shops = this.mapController.shopsFromModel;

	this.mapController.initMap(maps);
	this.buttonsContainer = this.getChildById('buttons-container');
	
	this.setCenter = (function (index) {
		this.mapController.centerMapToShopById(this.shops[index].id);
	}).bind(this);

	this.makeShopButtonListener = (function (index) {
		return (
			function () {
				this.setCenter(index);
			}
		).bind(this);
	}).bind(this);

	this.createShopButtons = function () {
		for (var i = 0; i < this.shops.length; i++) {
			var shop = this.shops[i];
			var buttonClickListener = this.makeShopButtonListener(i);
			var button = document.createElement('button');
	
			button.innerText = shop.title;
			button.addEventListener('click', buttonClickListener);
	
			this.buttonsContainer.appendChild(button);
		}
	}

	this.mapController.subscribe((function(data) {
		this.shops = data;

		this.createShopButtons();
	}).bind(this));

	this.createShopButtons();
}


function MapController() {

	this.mapModel = new MapModel();
	this.subscribe = this.mapModel.subscribe;
	this.unsubscribe = this.mapModel.unsubscribe;
	this.getData = this.mapModel.getData;
	this.shopsFromModel = this.mapModel.data;
	
	var myMap;

	this.mapModel.subscribe((function(data) {
		this.shopsFromModel = data;

		this.initPoints();
	}).bind(this));

	this.initMap = function(map) {
		ymaps.ready(function() {
			myMap = new ymaps.Map(map, {
				center: [59.8932, 30.3495],
				zoom: 16,
			});

			this.initPoints();
		}.bind(this));
	};

	this.initPoints = function() {
		for(var i = 0; i < this.shopsFromModel.length; i++) {
			var point = new ymaps.GeoObject({
				geometry: {
					type: 'Point',
					coordinates: this.shopsFromModel[i].coordinates,
				}
					
			});

			myMap.geoObjects.add(point);
		}
	}

	this.getShopsById = (function(id) {
		for (var i = 0; i < this.shopsFromModel.length; i++) {
			if (this.shopsFromModel[i].id === id) {
				return this.shopsFromModel[i];
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
	var subject;
	this.data = [];

	Model.call(this, this.data, function(_subject) {
		subject = _subject;
	});

	setTimeout(() => {
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

		subject.next(this.data);
	}, 2000);
}
