/**
 * @param {HTMLElement} containerNode 
 */
function ProductCardView(containerNode) {
  View.call(this, containerNode);
  
  var title = this.getChildById('product-card-title');
  var remains = this.getChildById('product-card-remains');
  var price = this.getChildById('product-card-price');
  var container = undefined;

  // this.remainsToNumber = function(container) {
  //   if (typeof container === 'undefined' || typeof container == 'isNaN') {
  //     console.log('loh')
  //   }  
  // };
  // this.remainsToNumber('undefined')
    
  this.getTitle = function() {
    return title.innerText;    
  }

  this.getRemains = function() {
    var remainsAsNumber = Number(remains.innerText); 

    if (isNaN(remainsAsNumber)) {
      console.log("loh");
      return null;
    }

    console.log("ne loh");
    return remainsAsNumber;
  }

  this.getPrice = function() {
    return Number(price.innerText);    
  }

  this.getRemains()
}


//зашишить через вар все, сделать метод для получения значения кусков дома.

//Получение всех компонентов.
