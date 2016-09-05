var allBeersNS = allBeersNS || {};

allBeersNS.Page = function () {
    this.beers = undefined;
}
allBeersNS.Page.prototype = function() {
    var buildPrice = function(price, article) {
            var p = document.createElement('p');
            p.className = 'productArticleWidePrice';
            p.innerHTML = '$' + price;
            article.appendChild(p);
            return article;
        },
        buildDescription = function(description, article) {
            var contentText = document.createElement('p');
            contentText.className = 'productArticleWideContent';
            contentText.innerHTML = description;
            article.appendChild(contentText);
            return article;
        },
        buildContent = function(name, beerId) {
            var content = document.createElement('div');
            content.className = 'productArticleWideContent';
            var header = document.createElement('header');
            header.setAttribute('data-beerId', beerId);
            header.innerHTML = name;
            content.appendChild(header);
            return content;
        },
        buildThumbnail = function(picture) {
            var thumbnail = document.createElement('div');
            thumbnail.className = 'productArticleWideThumbnail';

            var thumbnailImage = document.createElement('img');
            thumbnailImage.src = '/Images/' + picture;
            thumbnail.appendChild(thumbnailImage);
            return thumbnail;
        },
        buildArticle = function (item, price) {
            var article = document.createElement('article');
            article.className = 'productArticleWide';
            article.setAttribute('data-price', price);
            article.id = 'beer' + (item + 1);
            return article;
        },
        populate = function (beersList) {
            this.beers = beersList;
            var fragment = document.createDocumentFragment();
            var allBeers = document.getElementsByClassName('allBeers');
            for (var item = 0; item < this.beers.length; item++) {
                var beer = this.beers[item];
                var productArticle = buildArticle(item, beer.price);

                var thumb = buildThumbnail(beer.picture);
                productArticle.appendChild(thumb);

                var articleContent = buildContent(beer.name, beer.beerId);
                articleContent = buildDescription(beer.description, articleContent);
                articleContent = buildPrice(beer.price, articleContent);
                productArticle.appendChild(articleContent);

                fragment.appendChild(productArticle);
            }
            allBeers[0].appendChild(fragment);
            allBeersNS.createLinkEventHandlers();
            addDnDHandler();
        }
    return { populate: populate };
}();

allBeersNS.createLinkEventHandlers = function () {
    var headers = document.querySelectorAll('.productArticleWide header');
    for (var i = 0; i < headers.length; i++) {
        var product = headers[i];
        product.addEventListener('click', function () {
            var beerId = this.getAttribute('data-beerId');
            localStorage.setItem('beerDetails', beerId);
            window.location.href = "BeerDetails";
        });
    }
};
var loadPage = function () {
    var pathToScripts = document.querySelector('.allBeers span').getAttribute('data-url');
    var appPath = 'allbeers/loadpage';
    var pathToWorkerScript = pathToScripts + 'allBeerWorker.js';

    function messageHandler(e) {
        var beers = JSON.parse(e.data);
        var page = new allBeersNS.Page();
        page.populate(beers);
    };

    function errorHandler(e) {
        var teste = e.data;
    };

    var worker = new Worker(pathToWorkerScript);
    worker.onmessage = messageHandler;
    worker.onerror = errorHandler;
    worker.postMessage(appPath);
};
