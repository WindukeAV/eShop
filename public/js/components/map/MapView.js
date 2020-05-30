'use strict';

function MapView(containerNode) {
	View.call(this, containerNode);
	this.mapController = new MapController();

	var maps = this.getChildById('ymaps-container');
	this.mapController.initMap(maps);

	this.button = this.getChildById('button');

	var button_2 = this.getChildById('button_2');
	button_2.addEventListener('click', setCenter.bind(this));
	
	function setCenter() {
		
		this.mapController.setCenter();
		
	}
}
