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
  var data = {
    counter: 0,
  };
  var subject = new Subject(data);

  this.subscribe = subject.subscribe;
  this.unsubscribe = subject.unsubscribe;
  this.getData = subject.getData;

  this.inrementCounter = function() {
    setTimeout(() => {
      data.counter += 1;

      subject.next(data);
    }, 500);
  };
}
