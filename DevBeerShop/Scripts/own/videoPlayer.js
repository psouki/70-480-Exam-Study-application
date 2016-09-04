
var playerControls = function () {
    var slower = document.getElementById('slower');
    var rew = document.getElementById('rew');
    var stop = document.getElementById('stop');
    var play = document.getElementById('play');
    var fwd = document.getElementById('fwd');
    var faster = document.getElementById('faster');
    var mute = document.getElementById('mute');
    var video = document.getElementById('videoPlayer');

    slower.addEventListener('click', function() {
        video.playbackRate -= .25;
    }, false);

    rew.addEventListener('click', function() {
        video.currentTime -= 3;
    }, false);

    stop.addEventListener('click', function() {
        video.currentTime = 0;
        video.pause();
        play.innerHTML = '&#x25BA;';
    }, false);

    play.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            play.innerHTML = '||';
        } else {
            video.pause();
            play.innerHTML = '&#x25BA;';
        }
    }, false);

    fwd.addEventListener('click', function() {
        video.currentTime += 3;
    }, false);

    faster.addEventListener('click', function () {
        video.playbackRate += .25;
    }, false);

    mute.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            mute.innerHTML = '&#128263;';
        } else {
            video.muted = true;
            mute.innerHTML = '&#128266';
        }
    },false);
}

