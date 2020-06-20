'use strict';

/**
 * @typedef CartProduct
 * @type {object}
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {number} count
 */

/**
 * @typedef CartModelData
 * @type {object}
 * @property {Array.<CartProduct>} products
 * @property {number} productsCount
 * @property {number} totalPrice
 */

function CartView(containerNode) {
  View.call(this, containerNode);

  this.initFunction = function() {
    var counters = this.getChildComponentsNodeByName('navbar-cart-count');    
    console.log(counters);
  }

  
  this.initFunction();
  
  new CartModel();
}



function CartController(view) {
  Controller.call(this);
}

function CartModel() {
  /**
   * @type {CartModelData}
   */
  var data = {
    products: [],
    productsCount: 0,
    totalPrice: 0,
  };

  /**
   * @type {Subject}
   */
  var subject;

  Model.call(this, data, function(_subject) {
    subject = _subject;
  });

  /**
   * Пересчет цены и кол-ва товаров в корзине
   * @returns {void}
   */
  function recalcTotals() {
    var productsCount = 0;
    var totalPrice = 0;

    for (var i = 0; i < data.products.length; i++) {
      var product = data.products[i];

      productsCount += 1;
      totalPrice += product.price * product.count;
    }

    data.productsCount = productsCount;
    data.totalPrice = totalPrice;
  }

  /**
   * Добавление товара в корзину
   * @param {CartProduct} product
   * @returns {void}
   */
  this.addProduct = function(product) {
    var cartProduct = data.products.find(function (_cartProduct) {
      return _cartProduct.id === product.id;
    });

    if (cartProduct) {
      cartProduct.count += product.count;
    } else {
      data.products.push(product);
    }

    recalcTotals();

    subject.next(data);
  }

  CartModel.getInstance = function() {
    return this;
  };

  CartModel.getInstance = CartModel.getInstance.bind(this);
}


// ДОМА
/**
 * - 1. Пересмотреть весь проект (Вспомнить все!)
 * - 2. запилить вьюху для корзины (верстка + подписка на модель). Нужно показать кол-ва товаров
 * - 3. изменение кол-ва товара (с докой)
 * - 4. удаление товара (с докой)
 * - 5. Удалить лишние файлы + переименовать те файлы, которые криво названы
 * - 6. Стишок доучить
 */