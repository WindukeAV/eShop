'use strict';

function View(containerNode) {
	this.containerNode = containerNode;
	this.controller = new MapController();

	this.getChildById = function(id) {
		var component = this.containerNode.querySelector('[component-child-id="' + id + '"]');

		return component;
	};
	this.getChildById = this.getChildById.bind(this);

	var mapNode = this.getChildById('ymaps-container');
	this.controller.initMap(mapNode);


	var buttonser = this.getChildById('button');
	this.controller.settingCenter(buttonser);

	// this.button.addEventListener('click', onClick);

	// function onClick() {
	// 	console.log('click')
	// };


	// var counterButton = this.getChildById('button');
	// this.controller.buttonClick(counterButton);

}
