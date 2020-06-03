  function Subject(initData) {
  var listeners = [];
  var data = initData;

  this.subscribe = function(listener) {
    if (typeof listener !== 'function') return;

    var index = listeners.findIndex(listener);

    if (index !== -1) return;

    listeners.push(listener);
  };

  this.unsubscribe = function(listener) {
    if (typeof listener !== 'function') return;

    var index = listeners.findIndex(listener);

    if (index === -1) return;

    listener.splice(index, 1);
  };

  this.next = function(newData) {
    data = newData;

    for (var i = 0; i < listeners.length; i++) {
      listeners[i] (data);
    }
  }

  this.getData = function() {
    return data;
  }

  this.subscribe = this.subscribe.bind(this);
  this.unsubscribe = this.unsubscribe.bind(this);
  this.next = this.next.bind(this);
  this.getData = this.getData.bind(this);
}
