var createCodeId = function (name) {
    var code = name.split(' ');
    var codeId = code.join('');
    return codeId;
}

var OrderItem = function () {
    this.name ='';
    this.price = 0;
    this.quantity = 0;
    this.productId ='';
}
OrderItem.remove = function (itemElement) {
    var removeConfig = ShoppingCart.removeItem(itemElement.id);
    var eliminate = removeConfig[0];
    var reDraw = removeConfig[1];
    if (eliminate) {
        if (reDraw) {
            ShoppingCart.display();
        } else {
            var shoppingCart = document.querySelector('#shoppingCart ul:first-of-type');
            shoppingCart.removeChild(itemElement);
        }
    } else {
        ShoppingCart.display();
    }
}
OrderItem.prototype = function() {
    var add = function(name, price) {
        this.name = name;
        this.price = price;
        this.quantity++;
        this.productId = createCodeId(name);
        ShoppingCart.update(this);
        ShoppingCart.display();
    }
    return { add: add };
}();

var ShoppingCart = function() {};
ShoppingCart.removeItem = function (productId) {
    var currentCart = new Array();
    var eliminate = false;
    var reDraw = false;
    if (localStorage.getItem('cart')) {
        currentCart = JSON.parse(localStorage.getItem('cart'));
        for (var i = 0; i < currentCart.length; i++) {
            var item = currentCart[i];
            if (item.productId === productId) {
                if (item.quantity === 1) {
                    currentCart.splice(i, 1);
                    eliminate = true;
                } else {
                    item.quantity--;
                }
                break;
            }
        }
    }
    if (currentCart.length === 0) {
        reDraw = true;
    };
    localStorage.setItem('cart', JSON.stringify(currentCart));
    return [eliminate, reDraw];
}
ShoppingCart.update = function (orderItem) {
    var currentCart = new Array();
    if (localStorage.getItem('cart')) {
        currentCart = JSON.parse(localStorage.getItem('cart'));
        var itemIn = false;
        for (var product in currentCart) {
            var item = currentCart[product];
            if (item.name === orderItem.name) {
                currentCart[product].quantity++;
                itemIn = true;
                break;
            }
        }
        if (!itemIn) {
            currentCart.push(orderItem);
        }
    } else {
        currentCart.push(orderItem);
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
};
ShoppingCart.display = function () {
    var shoppingCartDropZone = document.getElementById('shoppingCart');
    var shoppingCart = shoppingCartDropZone.querySelector('ul');
    try {
        var cart = JSON.parse(localStorage.getItem('cart'));
        shoppingCart.innerHTML = '';
        if (cart == null || cart.length === 0) {
            throw 'empty';
        } else {
            var fragment = document.createDocumentFragment();
            for (var product in cart) {
                var item = cart[product];
                if (item.productId) {
                    var itemDisplay = item.name + ' : ' + item.quantity + ' - $' + (item.price * item.quantity).toFixed(2);
                    var itemElement = document.createElement('li');
                    itemElement.id = item.productId;
                    itemElement.innerHTML = itemDisplay;
                    itemElement.onclick = function () {
                        OrderItem.remove(this);
                    }
                    fragment.appendChild(itemElement);
                }
            }
            shoppingCart.appendChild(fragment);
        }
    } catch (e) {
        if (e === 'empty') {
            var li = document.createElement('li');
            li.innerHTML = '0 items';
            shoppingCart.appendChild(li);
        }
    } 
    
};



