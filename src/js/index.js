function start(event) {
    var cardEl = event.currentTarget;
    var audioEl = cardEl.getElementsByTagName('audio')[0];
    var videoEl = cardEl.getElementsByTagName('video')[0];

    if (!audioEl.paused) {
        audioEl.currentTime = 0;
        audioEl.pause();
        cardEl.classList.remove('card--show-giphy');
    } else if  (audioEl.readyState === 4) {
        play();
    } else {
        cardEl.classList.add('card--loading');
        audioEl.load();
        videoEl.load();
        videoEl.addEventListener('canplaythrough', clipLoadedCallback);
    }

    function play() {
        stopOthers();
        audioEl.addEventListener('ended', clipEndedCallback);
        audioEl.play();
        videoEl.play();
        cardEl.classList.add('card--show-giphy');
    }

    function clipLoadedCallback() {
        cardEl.classList.remove('card--loading');
        play();
    }

    function clipEndedCallback() {
        cardEl.classList.remove('card--show-giphy');
    }

    function stopOthers() {
        var cards = document.querySelectorAll('.card');
        cards.forEach((cardEl) => {
            var audioEl = cardEl.querySelector('audio');
            if (!audioEl || audioEl.paused) return;
                audioEl.currentTime = 0;
                audioEl.pause();
                cardEl.classList.remove('card--show-giphy');
        });
    }
}
