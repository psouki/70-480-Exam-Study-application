
var detailNS = detailNS || {};

detailNS.DetailPage = function () {
    this.beer = undefined;
    this.beerFound = false;
}
detailNS.DetailPage.prototype = function () {
    var build = function(beer) {
            var header = document.querySelector('.blockHeaderBeer span');
            if (beer === undefined || beer === null) {
                header.innerHTML = 'Beer not found"';
            } else {
                var image = document.getElementsByClassName('productArticleLargeImage');
                var nationality = document.querySelector('div.info div:first-child .back');
                var category = document.querySelector('div.info div:nth-child(2) .back');
                var alchool = document.querySelector('div.info div:nth-child(3) .back');
                var description = document.querySelector('div.productArticleContent p.productArticleDescription');
                var price = document.querySelector('div.productArticleContent p.productArticlePrice');

                header.innerHTML = beer.name;

                var searchPic = new Image(100, 100);
                searchPic.src = 'http://localhost:35371/Images/' + beer.picture;
                image[0].src = searchPic.src;
                image[0].width = 462;
                image[0].height = 515;

                nationality.innerHTML = beer.nationality;
                category.innerHTML = beer.kind;
                alchool.innerHTML = beer.alchool;
                description.innerHTML = beer.description;
                price.innerHTML = 'Price: $' + beer.price;
            }
        }
    return { build: build };
}();

detailNS.LoadJson = function (json, callback, beerClicked) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', json, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback.call(xhr.response); // other way of calling the callback
            } else {
                console.log(xhr.status);
            }
        }
    }
    xhr.send(beerClicked);
}

var loadPage = function () {
    var beerClicked = 'nda';
    if (localStorage.getItem('beerDetails')) {
        beerClicked = localStorage.getItem('beerDetails');
    }
    var appPath = 'GetBeerDetails/' + beerClicked;

    var beer;
    detailNS.LoadJson(appPath, function () {
        beer = JSON.parse(this); // as result of the call method the THIS became the response returned.
        var page = new detailNS.DetailPage();
        page.build(beer);
    }, beerClicked);
};
