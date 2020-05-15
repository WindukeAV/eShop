function MapView(containerNode) {
	this.containerNode = containerNode;

	this.getComponentById = function(id) {
		var component = this.containerNode.querySelector('[component="' + id + '"]');
		return component;

	};


	this.getComponentById = this.getComponentById.bind(this);
}
