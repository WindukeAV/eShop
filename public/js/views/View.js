function View(containerNode) {
	this.containerNode = containerNode;

	this.getChildById = function(id) {
		var child = this.containerNode.querySelector('[component-child-id="' + id + '"]');

		return child;
	};

	this.getChildById = this.getChildById.bind(this);
}
