'use strict';

function CounterView(containerNode) {
  var controller = new CounterController(this);
  this.containerNode = containerNode;
  this.button = this.containerNode.querySelector('[component-child-id="button"]');
  this.title = this.containerNode.querySelector('[component-child-id="title"]');

  this.handleClick = function() {
    console.log('processing click...');
    controller.handleInrementClick();
  };

  this.setCounter = function(counter) {
    this.title.textContent = 'Счетчик ' + counter;
  };

  this.handleClick = this.handleClick.bind(this);
  this.setCounter = this.setCounter.bind(this);

  this.button.addEventListener('click', this.handleClick);
}


function CounterController(view) {
  var view = view; 
  var model = new CounterModel();
  var isProccessingIncrementClick = false;

  this.handleInrementClick = function() {
    model.inrementCounter();
  };
}

function CounterModel() {
  var counter = 0;

  this.inrementCounter = function(callback) {
    setTimeout(() => {
      counter += 1;
      subject.next(counter);

      if (typeof callback === 'function') {
        callback(counter);
      }
    }, 500);
  };

  this.getCounter = function() {
    return counter;
  };
}
