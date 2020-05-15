'use strict';

var COMPONENTS_VIEWS = {	
	'map__': MapView,	
}


function App() {
	var elements = document.querySelectorAll('[component]');
	
	for (var i = 0; i < elements.length; i++) {
		var componentName = elements[i].getAttribute('component');

		var view = COMPONENTS_VIEWS[componentName];

		if (typeof view === 'function') {
			new view(elements[i]);
		}	
	}
}

function init() {
	var app = new App();

	window.app = app;
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}

