'use strict';

function CounterView(containerNode) {
  View.call(this, containerNode);

  var controller = new CounterController(this);
  this.button = this.getChildById('button');
  this.title = this.getChildById('title');

  this.handleClick = function() {
    controller.handleInrementClick();
  };

  this.handleClick = this.handleClick.bind(this);
  this.button.addEventListener('click', this.handleClick);

  this.title.innerText = 'Счетчик: ' + controller.getData().counter;

  controller.subscribe( 
    (
      function (data) {
        this.title.innerText = 'Счетчик: ' + data.counter;
      }
    ).bind(this)
  );
}

function CounterController(view) {
  var view = view;
  var model = new CounterModel();

  this.subscribe = model.subscribe;
  this.unsubscribe = model.unsubscribe;
  this.getData = model.getData;

  this.handleInrementClick = function() {
    model.inrementCounter();
  };
}

function CounterModel() {
  var data = { counter: 5 };
  var subject;

  Model.call(this, data, function(_subject) { subject = _subject; });

  this.inrementCounter = function() {
    setTimeout(() => {
      data.counter += 1;

      subject.next(data);
    }, 500);
  };
}
