'use strict';

var COMPONENTS_VIEWS = {
  'hot-product-list': HotProductListView,
  'map': Map,
  'navbar__menu': Cart,
}

function App() {
  var elements = document.querySelectorAll('[component]'); 
 
  for (var i = 0; i < elements.length; i++) {
    var componentName = elements[i].getAttribute('component');
    var componentAutoInit = elements[i].getAttribute('component-auto-init');
    var view = COMPONENTS_VIEWS[componentName];
    var shouldAutoInitComponent = componentAutoInit === 'true';

    if (typeof view === 'function' && shouldAutoInitComponent) {
      console.info("INIT COMPONENT: " + componentName);

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
