var config = {
    pics: [],
    caption: [],
    index: 0,
    path: ''
};

var galleryNS = galleryNS || {};
galleryNS.changePic = function (element, fwd) {
    var maxPics = config.pics.length - 1;
    var captionText = $('#slideshow div:first-child div:first-of-type');
    if (fwd) {
        if (config.index < maxPics) {
            config.index++;
        } else {
            config.index = 0;
        }
    } else {
        if (config.index > 0) {
            config.index--;
        } else {
            config.index = maxPics;
        }
    }
    captionText.text(config.caption[config.index]);
    element[0].src = config.path + config.pics[config.index];
   };
galleryNS.picTransition = function() {
    var picElement = $('#picswap');
    picElement.fadeOut(1000);
    setTimeout(function() {
        galleryNS.changePic(picElement, true);
        picElement.fadeIn(1000);
    },1000);
};

window.onload = function () {
    var picElement = $('#picswap');
    picElement.hide();
    picElement.fadeIn(1000);

    var slideShow = document.getElementById('slideshowButton');
    slideShow.innerHTML = 'Slideshow';

    var picInterval;
    var rew = document.querySelector('#beerGallery #slideshow span:first-of-type');
    rew.addEventListener('click', function () {
        slideShow.innerHTML = 'Slideshow';
        clearInterval(picInterval);
        galleryNS.changePic(picElement, false);
    }, false);

    var fwd = document.querySelector('#beerGallery #slideshow span:nth-of-type(2)');
    fwd.addEventListener('click', function() {
        slideShow.innerHTML ='Sildeshow';
        clearInterval(picInterval);
        galleryNS.changePic(picElement, true);
    }, false);

    slideShow.addEventListener('click', function () {
        if (slideShow.innerHTML === 'Stop') {
            slideShow.innerHTML = 'Slideshow';
            clearInterval(picInterval);
        } else {
            slideShow.innerHTML = 'Stop';
            picInterval = setInterval(galleryNS.picTransition, 4000);
        }
    },false);

};

galleryNS.LoadJson = function(data) {
    $.each(data, function(i, value) {
        config.pics.push(value.picture);
        config.caption.push(value.caption);
    });
}
galleryNS.buildSlideshow = function() {
    $('#picswap')[0].src = config.path + config.pics[config.index];
    $('#slideshow div:first-child div:first-of-type').text(config.caption[config.index]);
}

$(document).ready(function () {
    var pathToScripts = document.querySelector('#beerGallery span').getAttribute('data-url');
    //var appPath = 'http://localhost:35371' + pathToScripts + 'gallery.json';

    var appPath = 'gallery/loadpage';
    $.getJSON(appPath, function (data) {
        galleryNS.LoadJson(JSON.parse(data));
        galleryNS.buildSlideshow();
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log(err);
    });
});