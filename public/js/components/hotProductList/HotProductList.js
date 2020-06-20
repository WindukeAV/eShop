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

      this.productData = {
        id: i,
        title: productCardView.getTitle(),
        remains: productCardView.getRemains(),
        price: productCardView.getPrice(),
      }

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
   * @param {Product} product
   * @returns {void}
   */
  this.addProductToCart = function(product) {
    // CartModel.addProduct(product);

    // TODO: update product card view
  };
}
