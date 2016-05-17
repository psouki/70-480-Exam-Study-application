var appPath = "http://localhost:35371/Scripts/own/json/beerFront.json";
var BEERINDEX = (function (jsonFile) {
    var getBeers = function () {
        var beers;
        $.ajax({
            type: 'get',
            url: jsonFile,
            async: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        })
        .done(function(json) {
            beers = json;
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log(err);
            beers = [];
        });
        return beers;
    };
    return {getBeers: getBeers };
})(appPath);

BEERINDEX = (function (oldNS) {
    oldNS.populateHomePage = function (beers) {
        var beerBestSeller = $('.beerBestsellers');
        var beerGoodChoices = $('.goodChoices');

        $.each(beers, function (i, data) {
            var productArticle = $('<article class="productArticle"></article>');

            var figure = $('<figure></figure>');
            var thumbnailImage = $('<img class="productArticleThumbnail" />');
            thumbnailImage.attr('src', '/Images/' + data.picture);
            figure.append(thumbnailImage);

            var articleHeader = $('<header></header>');
            var spanHeader = $('<span class="productArticleName"></span>');
            spanHeader.attr('data-beerId', data.beerId);
            spanHeader.text(data.name);
            articleHeader.append(spanHeader);

            var articlePrice = $('<p class="productArticlePrice"></p>');
            articlePrice.text('$' + data.price);

            var addButton = $('<div class="addCartButton"></div>');
            addButton.attr('data-beerName', data.name);
            addButton.attr('data-beerPrice', data.price);
            addButton.text('Add to Cart');

            productArticle.append(figure);
            productArticle.append(articleHeader);
            productArticle.append(articlePrice);
            productArticle.append(addButton);

            if (data.front === 'bestSeller') {
                beerBestSeller.append(productArticle);
            } else if (data.front === 'goodChoice') {
                beerGoodChoices.append(productArticle);
            }
        });
    }
    return oldNS;
})(BEERINDEX);

$(document).ready(function () {
    var beers = BEERINDEX.getBeers();
   BEERINDEX.populateHomePage(beers);

    $('.productArticleName').click(function (e) {
        var element = e.target;
        var beerId = element.getAttribute('data-beerId');
        localStorage.setItem('beerDetails', beerId);
        window.location.href = "Home/BeerDetails";
    });

    $('.addCartButton').click(function(e) {
        var price = this.getAttribute('data-beerPrice');;
        var name = $(this).attr('data-beerName');
        var order = new OrderItem();
        order.add(name, price);
    });
});

