/**
 * @typedef ProductCardData
 * @type {object}
 * @property {Product} product
 * @property {boolean} isInCart
 * @property {number} count
 */

/**
 * @typedef HotProductListModelData
 * @type {object}
 * @property {Array.<ProductCardData>} productCardList
 */

/**
 * @typedef Product
 * @type {object}
 * @property {string} id - id
 * @property {string} title - title
 * @property {number} remains - remains
 * @property {number} price - price
 */

/**
 * @param {HTMLElement} containerNode
 * @returns {HotProductListView}
 */
function HotProductListView(containerNode) {
  View.call(this, containerNode);

  var controller = new HotProductListController(this);

  /**
   * @type {Array.<ProductCardView>}
   */
  var productCardViews = [];

  /**
   * @returns {void}
   */
  this.initProductList = function() {
    var components = this.getChildComponentsNodeByName('product-card');
      
    for (var i = 0; i < components.length; i++) {
      var productCardView = new ProductCardView(components[i]);

      this.subscribeBuyButtonClickToProductCardView(productCardView);

      this.productData = {
        id: i,
        title: productCardView.getTitle(),
        remains: productCardView.getRemains(),
        price: productCardView.getPrice(),
      }

      productCardView.setId(i);

      this.addProductData = controller.addProduct(this.productData)
      productCardViews.push(productCardView);
    }

    controller.subscribe(this.handleModelUpdate);

    this.handleModelUpdate(controller.getData());
  };

  /**
   * Обрабатывает данные модели
   * @param {HotProductListModelData} data
   * @returns {void}
   */
  this.handleModelUpdate = function(data) {
    for (var i = 0; i < data.productCardList.length; i++) {
      var cardData = data.productCardList[i];

      productCardViews[i].setTitle(cardData.product.title);
      productCardViews[i].setRemains(cardData.product.remains);
      productCardViews[i].setPrice(cardData.product.price);
    }
  };

  /**
   * Отлвавливание кликов по кнопке "купить" в карточке товара
   * @param {ProductCardView} productCardView
   * @returns {void}
   */
  this.handleCardBuyButtonClick = function(productCardView) {
    controller.addProductToCart(productCardView.getId());
  };

  /**
   * Подписка handleCardBuyButtonClick к карточке товара на клик по кнопке "купить"
   * @param {ProductCardView} productCardView
   * @returns {void}
   */
  this.subscribeBuyButtonClickToProductCardView = function(productCardView) {
    var listener = function () {
      this.handleCardBuyButtonClick(productCardView);
    };

    listener = listener.bind(this);

    productCardView.handleClick(listener);
  };

  this.initProductList = this.initProductList.bind(this);
  this.handleModelUpdate = this.handleModelUpdate.bind(this);

  this.initProductList();  
}

/**
 * @param {HotProductListView} view 
 * @returns {HotProductListController}
 */
function HotProductListController(view) {
  var model = new HotProductListModel();
  Controller.call(this, model);  

  this.addProduct = model.addProduct;
  this.addProductToCart = model.addProductToCart;
}

/**
 * @returns {HotProductListModel}
 */
function HotProductListModel() {
  /**
   * @type {HotProductListModelData}
   */
  var data = {
    productCardList: [],
  };
  
  /**
   * @type {Subject}
   */
  var subject;
    
  Model.call(this, data, function(_subject) {
    subject = _subject;
  });
  
  /**
   * @param {Product} product
   * @returns {void}
   */
  this.addProduct = function(product) {
    data.productCardList.push({ product: product, isInCart: false, count: 0 });

    subject.next(data);
  };

  /**
   * @param {number} productId
   * @returns {void}
   */
  this.addProductToCart = function(productId) {
    var productCard = data.productCardList.find(function(productCard) {
      return productCard.product.id === productId;
    });
    console.log(productCard);
    if (productCard) {
      var product = productCard.product;
      /**
       * @type {CartModel}
       */
      var cart = CartModel.getInstance();

      cart.addProduct({
        id: product.id,
        title: product.title,
        price: product.price,
        count: 1,
      });
    }
  };
}
