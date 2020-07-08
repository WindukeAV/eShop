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

function Cart(containerNode) {
  View.call(this, containerNode);

  this.initFunction = function() {
    var CartCounter = this;
    console.log(CartCounter);
  }

  this.initFunction();
  
  new CartModel();
}

function CartController(view) {
  Controller.call(this);
}

function CartModel() {
  
  /**
   * @type {CartModelData}0
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


    if (cartProduct) {
      cartProduct.count += product.count;
    } else {
      data.products.push(product);
    }

    recalcTotals();

    subject.next(data);
  }

  /**
   * @param {CartProduct['id']} id
   * @returns {CartProduct}
   */
  getProductById = function(id) {
    var cartProduct = data.products.find(function (_cartProduct) {
      return _cartProduct.id === id;
    });

    if(cartProduct) {
      return cartProduct
    }
  };

  /**
   * @param 
   * @returns {void}
   */
  updateProductCount = function() {
    
  };
 
  /**
   * @param {CartProduct['id']} id
   * @returns {void}
   */
  this.removeProduct = function(id) {
    var cartProductIndex = data.products.findIndex(function (_cartProduct) {
      return _cartProduct.id === id;
    });

    if (cartProductIndex) {
      data.products.splice(cartProductIndex, 1);

      recalcTotals();

      subject.next(data);
    }
  }

  /**
   * @param {CartProduct['id']} id
   * @returns {void}
   */
  this.PlusProductCount = function(id) {
    var cartProduct = data.products.find(function (_cartProduct) {
      return _cartProduct.id === id;
    });

    if (cartProduct) {
      cartProduct.count += 1;
      
      subject.next(data);
    }
  }
    /**
   * @param {CartProduct['id']} id
   * @returns {void}
   */
  this.MinusProductCount = function(id) {
    var cartProduct = data.products.find(function (_cartProduct) {
      return _cartProduct.id === id;
    });

    if (cartProduct) {
      cartProduct.count -= 1;
      
      subject.next(data);
    }
  }

  CartModel.getInstance = function() {
    return this;
  };

  CartModel.getInstance = CartModel.getInstance.bind(this);
}
 