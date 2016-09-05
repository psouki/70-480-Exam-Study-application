var builtConfirmationList = function () {
    var orderlist = $('#confirmation');
    var list = $('<ul></ul>');
    if (localStorage.getItem('cart')) {
        var order = JSON.parse(localStorage.getItem('cart'));
        var total = 0;
        for (var item in order) {
            var orderItem = order[item];
            if (!isNaN(orderItem.quantity) && !isNaN(orderItem.price)) {
                var orderElement = $('<li></li>');
                var subTotal = (orderItem.quantity * orderItem.price);
                total += subTotal;
                orderElement.text(orderItem.quantity + 'x : ' + orderItem.name + ' - $' + subTotal);
                list.append(orderElement);
            }
        }
        var totalElement = $('<li></li>');
        totalElement.text('Total: $' + total.toFixed(2));
        list.append(totalElement);
        orderlist.append(list);
    }
};

var sendOrder = function () {
    var confirmation = $('#confirmation');
    confirmation.removeClass('offLine');
    confirmation.addClass('sendData');
    confirmation.text('Your order was submit successfully!');
    builtConfirmationList();
    localStorage.removeItem('cart');
    displayCurrentCart();
};

var offlineNotification = function () {
    var confirmation = $('#confirmation');
    confirmation.removeClass('sendData');
    confirmation.addClass('offLine');
    confirmation.text('Your browser seems to be offline, but your order was saved! ');
    var newLine = $('<p></p>');
    newLine.text('As soon as the conections is restored we will send your order, please wait.');
    confirmation.append(newLine);
};

$(document).ready(function () {
    window.addEventListener('offline', function (e) {
        offlineNotification();
    });
    window.addEventListener('online', function(e) {
        sendOrder();
    });

    $('#mainAction').submit(function(e) {
        e.preventDefault();
        $('#mainAction').hide();
        $('#confirmation').removeClass('notVisible');
        if (navigator.onLine) {
            sendOrder();
        } else {
            offlineNotification();
        }
    });
});


