function Subject() {
  var listeners = [];
  var data;

  this.subscribe = function(listener) {
    var index = listeners.findIndex(listener);

    if (index !== -1) return;

    listeners.push(listener);
  };

  this.unsubscribe = function(listener) {
    var index = listeners.findIndex(listener);

    if (index === -1) return;

    listener.splice(index, 1);
  };

  this.next = function(newData) {
    data = newData;

    for (var i = 0; listeners; i++) {
      if (typeof listeners[i] === 'function') {
        listeners[i] (data);
      }
    }
  }
}
