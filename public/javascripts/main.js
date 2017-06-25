function init() {
    var $body = $('body');

    var selectors = {
        ayat: '.ayat',
        continue: '.js-сontinue-btn',
        toTop: '.js-to-top-btn'
    };

    function scrollToAnchor(position) {
        $body.animate({
            scrollTop: position | 0
        }, 1000);
    }

    function scrollByHash() {
        var hash = window.location.hash;
        var $block = $(hash);
        if ($block.length) {
            $block.addClass('selected');
            scrollToAnchor($block.offset().top - 70);
        }
    }

    function copy(e) {
        var text = window.getSelection().toString();
        var surah = '';

        var result = text
            .split(/(\d+:\d+)|(\(\d+\))|(\.)/g)
            .filter(t => {
                if (/(\d+:\d+)/.test(t)) {
                    surah += ' ' + t;
                    return false;
                } else if (/(\(\d+\)|(\.))/.test(t)) {
                    return false;
                }
                return true;
            })
            .join('')
        if (e.originalEvent.clipboardData) {
            e.originalEvent.clipboardData.setData('text/plain', result + '\n' + surah);
            e.preventDefault();
        }
    }

    /*function redirect() {
        var path = window.location.pathname;
        var savedPath = window.localStorage.getItem('readquran.ru/path');
        if (path != savedPath) {
            window.location.pathname = savedPath;
        }
    }*/

    function savePosition() {
        var path = window.location.pathname;
        if (!path) {
            return;
        }
        window.localStorage.setItem('readquran.ru/position', document.body.scrollTop);
        window.localStorage.setItem('readquran.ru/path', path);
    }

    var prevScrollPos = false;

    function onScroll() {
        var scrollY  = window.scrollY;
        if (scrollY > 130 && prevScrollPos >= window.scrollY) {
            $body.addClass('to-top-button');
        } else {
            $body.removeClass('to-top-button');
        }
        prevScrollPos = scrollY;
    }

    // $(selectors.ayat).on('copy', copy);
    $(selectors.toTop).on('click', scrollToAnchor);
    // $(selectors.continue).on('click', redirect);
    $(window).on('scroll', onScroll);
    scrollByHash();
}

$(document).ready(init);
