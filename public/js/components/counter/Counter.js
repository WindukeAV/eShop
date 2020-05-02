'use strict';

function CounterView(containerNode) {
  this.containerNode = containerNode;
  this.button = this.containerNode.querySelector('[component-child-id="button"]');
  this.title = this.containerNode.querySelector('[component-child-id="title"]');

  var counter = 0;

  this.handleClick = function() {
    counter += 1;

    this.title.textContent = 'Счетчик ' + counter;
  }

  this.handleClick = this.handleClick.bind(this);

  this.button.addEventListener('click', this.handleClick);
}
