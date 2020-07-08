/**
 * @param {HTMLElement} containerNode 
 */
function ProductCardView(containerNode) {
    View.call(this, containerNode);

    /**
     * @type {number}
     */
    var id;
    var title = this.getChildById('product-card-title');
    var remains = this.getChildById('product-card-remains');
    var price = this.getChildById('product-card-price');
    var buyButton = this.getChildById('product-card-buy');
  
    /**
     * @param {Function} listener
     * @returns {void}
     */
    this.handleClick = function(listener) {
        buyButton.addEventListener('click', listener);
    }

    /**
     * @returns {number}
     */
    this.getId = function() {
        return id;
    }
    
    /**
     * @param {String} 
     * @returns {String}
     */
    this.getTitle = function() {          
        return title.innerText;
    }

    /**
     * @param {Number} number
     * @returns {Number}
     */    
    this.getRemains = function() {
        return this.isNumber(remains.innerText);
    }

    this.getPrice = function() {
        return this.isNumber(price.innerText);
    }    

    this.isNumber = function(value) {
        var isNumber = Number(value);

        if (isNaN(isNumber)) {           
            return null;
        }        

        return isNumber;
    }

    /**
     * @param {String} data
     * @returns {String}
     */
    var setData = function(param, data) {
        param.innerText = data;
    }

    /**
     * @param {number} id 
     * @returns {void}
     */
    this.setId = function(_id) {
        id = _id;
    }

    this.setTitle = function(data) {
        setData(title, data);        
    }


    this.setRemains = function(data) {
        setData(remains, data);
    }

  
    this.setPrice = function(data) {
        setData(price, data);
    }
}
