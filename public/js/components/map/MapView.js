'use strict';

function MapView(containerNode) {
	View.call(this, containerNode);
	this.mapController = new MapController();

	var maps = this.getChildById('ymaps-container');
	this.mapController.initMap(maps);

	this.buttonsContainer = this.getChildById('buttons-container');
	
	this.setCenter = (function (index) {
		this.mapController.centerMapToShopById(this.mapController.shops[index].id);
	}).bind(this);

	this.makeShopButtonListener = (function (index) {
		return (
			function () {
				this.setCenter(index);
			}
		).bind(this);
	}).bind(this);

	for (var i = 0; i < this.mapController.shops.length; i++) {
		var shop = this.mapController.shops[i];
		var buttonClickListener = this.makeShopButtonListener(i);
		var button = document.createElement('button');

		button.innerText = shop.title;
		button.addEventListener('click', buttonClickListener);

		this.buttonsContainer.appendChild(button);
	}
}
