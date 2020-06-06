/**
 * @param {HTMLElement} containerNode 
 * @returns {View}
 */
function View(containerNode) {	
	this.containerNode = containerNode;

	/**
	 * @param {string} id - child id
	 * @returns {HTMLElement}
	 */
	this.getChildById = function(id) {
		var child = this.containerNode.querySelector('[component-child-id="' + id  + '"]');
		
		return child;
	};

	/**
	 * @param {string} name - component name
	 * @returns {HTMLElement}
	 */
	this.getChildComponentNodeByName = function(name) {
		var component = this.containerNode.querySelector('[component="' + name + '"]');

		return component;
	}

	/**
	 * @param {string} name - component name
	 * @returns {HTMLElement}
	 */
	this.getChildComponentsNodeByName = function(name) {
		var components = this.containerNode.querySelectorAll('[component="' + name + '"]');

		return components;
	}

	this.getChildById = this.getChildById.bind(this);
	this.getChildComponentNodeByName = this.getChildComponentNodeByName.bind(this);
	this.getChildComponentsNodeByName = this.getChildComponentsNodeByName.bind(this);
}
