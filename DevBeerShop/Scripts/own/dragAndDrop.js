

var addDnDHandler = function () {
    var product = document.querySelectorAll('.productArticleWide');
    var shoppingCartDropZone = document.getElementById('shoppingCart');
    
    for (var i = 0; i < product.length; i++) {
        var articleDiv = product[i];
        articleDiv.addEventListener('dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('Text', this.getAttribute('id'));
        }, false);
    }

    shoppingCartDropZone.addEventListener('dragover', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.effectAllowed = 'copy';
        return false;
    }, false);

    shoppingCartDropZone.addEventListener('drop', function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        var id = e.dataTransfer.getData('Text');
        var product = document.getElementById(id);

        var productName = product.getElementsByTagName('header')[0].innerText;
        var price = product.getAttribute('data-price');
        var order = new OrderItem();
        order.add(productName, price);
        e.stopPropagation();
        return false;
    }, false);
}



