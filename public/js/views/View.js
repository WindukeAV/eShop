'use strict';

function View(containerNode) {
	this.containerNode = containerNode;
	this.controller = new MapController();

	this.getComponentById = function(id) {
		var component = this.containerNode.querySelector('[component-child-id="' + id + '"]');

		return component;
	};
	
	this.getComponentById = this.getComponentById.bind(this);	

	var mapNode = this.getComponentById('ymaps-container');
	
	this.controller.initMap(mapNode);	
}
