function View(containerNode) {
	var controller = new CounterController(this);
	this.containerNode = containerNode;	
	this.button = this.containerNode.querySelector('[component-child-id="button"]');
	this.title = this.containerNode.querySelector('[component-child-id="title"]');
	this.button.addEventListener('click', this.handleClick);

	this.handleClick = function() {
		console.log('processing click...');
		controller.handleInrementClick();
	};    
}