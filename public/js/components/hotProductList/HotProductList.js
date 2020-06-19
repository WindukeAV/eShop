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


  this.getDataFromModel = function() {
    
  }


  console.log(controller.getData())

  // controller.subscribe(function() {
    
  // })


  //вынести контроллер сабскрайб
  //сможем его переиспользовать 
  //брать данные из модели и отображать их


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
      console.log(this.productData);
      this.addProductData = controller.addProduct(this.productData)
      productCardViews.push(productCardView);
    }
  };
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

  var data = {
    productCardList: [
      
    ],
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
    data.productCardList.push({product: product, isInCart: false, count: 0});

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

/*1. Кнопка купить -> Кнопка в корзине 
  2. интуп + - по количеству товара
  3. метод понимания нахождения товара в корзине
  4. HotproductCardListModel -> общение с корзиной -> список товаров -> productList[] = массив 
  товаров -> productCardList[
    {
      ProductData:
      isInCart: false
      Count: 0
    }
  ]

  5. подумать как правильно проверить кнопку 
  6. подкорректировать данные которые заполнит ProductCardView -> добавляет продукты -> должна
   отдавать карточки или отдать только продукт
  7. подписаться на обновления для ProductCardView -> в HotProductListModel обновлятся данные -> 
  hotProductList должна отреагировать на изменения и обновить данные
  8. после того как все товары добавлены в HotProductList -> ProductCardView должна подписаться
  на HotProductList с обновленными товарами.
  9. <= setTitle -> добавить сеттеры строку получает новый тайтл внутри себя обращается к куску дома и с помощью
  innerText засовывает туда данные 
  10. Подписка hotPdoructView на HotProductListModel

    ProductCardView.setTitle(ProductList[i].dataTitle)

*/
