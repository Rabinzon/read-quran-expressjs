function init() {
    var $body = $('body');
    var $window =  $(window);

    var selectors = {
        ayat: '.ayat',
        continue: '.js-сontinue-btn',
        toTop: '.js-to-top-btn',
        bookmark: '.js-to-bookmark-btn',
        continueReading: '.js-continue-reading'
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

   /* function copy(e) {
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
    }*/

    function toBookmark() {
        var path = window.location.pathname;
        var savedPath = window.localStorage.getItem('readquran.ru/path');
        if (path != savedPath) {
            window.location = savedPath;
        }
    }

    function getCurrentAyat() {
        const scrollY = window.scrollY;
        return $(selectors.ayat)
            .toArray()
            .reduce((acc, cur) =>
                (scrollY + 80) - $(cur).offset().top > 0 ? cur : acc);
    }

    function setBookmark() {
        var path = window.location.pathname;
        if (!path) {
            return;
        }
        const current = getCurrentAyat();
        const hash = $(current).attr('id');
        window.localStorage.setItem('readquran.ru/path', path + '#' + hash);
    }

    function showBookmarkLink() {
        var path = window.location.pathname;
        var savedPath = window.localStorage.getItem('readquran.ru/path');
        if (path != savedPath) {
            $(selectors.continueReading).show();
        }
    }

    var prevScrollPos = false;

    function onScroll() {
        var scrollY  = window.scrollY;
        if (scrollY > 130 && (prevScrollPos >= scrollY)) {
            $body.addClass('to-top-button');
        } else {
            $body.removeClass('to-top-button');
        }
        prevScrollPos = scrollY;
    }

    // $(selectors.ayat).on('copy', copy);
    $(selectors.toTop).on('click', scrollToAnchor);
    $(selectors.bookmark).on('click', setBookmark);
    $(selectors.continueReading).on('click', toBookmark);
    showBookmarkLink();
    $window.on('scroll', onScroll);
    scrollByHash();
}

$(document).ready(init);
