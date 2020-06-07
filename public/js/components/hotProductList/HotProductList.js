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

  /**
   * @type {Array.<ProductCardView>}
   */
  var productCardViews = [];
  var controller = new HotProductListController(this);

  controller.subscribe(function(data) {
    console.log(data);
  })

  /**
   * @returns {void}
   */
  this.initProductList = function() {
    var components = this.getChildComponentsNodeByName('product-card');
    


    for (var i = 0; i < components.length; i++) {
      var productCardView = new ProductCardView(components[i]);

      this.productData = { //методы которые будут брать данные из этих дом кусков
        id: i,
        title: getTitleData(title),
        remains: productCardView.remains,
        price: productCardView.price,
      }     
      
 //добавить в addProduct что-бы он оказался в моделе и добавился в product list

      console.log(this.productData);
      this.addProductData = controller.addProduct(this.productData)

      console.log(productCardViews)



      productCardViews.push(productCardView);      
    }
  };

  this.initProductList();
}

// ------------------------------------------------

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

// ------------------------------------------------

/**
 * @returns {HotProductListModel}
 */
function HotProductListModel() {
  var data = {
    productList: [],
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
    data.productList.push(product);

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
