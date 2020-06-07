/**
 * @param {HTMLElement} containerNode 
 */
function ProductCardView(containerNode) {
  View.call(this, containerNode);
  
  var title = this.getChildById('product-card-title');
  var remains = this.getChildById('product-card-remains');
  var price = this.getChildById('product-card-price');
  
  console.log(title)
  
  this.getTitleData = function() {    
    console.log('1')
    return this.getChildById('product-card-title');
    
  }
}

//зашишить через вар все, сделать метод для получения значения кусков дома.

//Получение всех компонентов.
