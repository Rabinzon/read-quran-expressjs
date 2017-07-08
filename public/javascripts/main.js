function init() {
    var $body = $('body');
    var $window =  $(window);

    var selectors = {
        ayat: '.ayat',
        continue: '.js-сontinue-btn',
        toTop: '.js-to-top-btn',
        bookmark: '.js-to-bookmark-btn',
        continueReading: '.js-continue-reading',
        bookmarkAlert: '.js-bookmark-alert',
        orderBtn: '.js-order-btn'
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

    function toBookmark() {
        var path = window.location.pathname;
        var savedPath = window.localStorage.getItem('readquran.ru/path');
        if (path != savedPath) {
            window.location = savedPath;
        }
    }

    function getCurrentAyat() {
        var scrollY = window.scrollY;
        return $(selectors.ayat)
            .toArray()
            .reduce(function(acc, cur) {
                return (scrollY + 80) - $(cur).offset().top > 0 ? cur : acc;
            });
    }

    function setBookmark() {
        var path = window.location.pathname;
        var current = getCurrentAyat();
        var hash = $(current).attr('id');
        if (!path || !hash) {
            return;
        }

        window.localStorage.setItem('readquran.ru/path', path + '#' + hash);
        $(selectors.bookmarkAlert).show();
        setTimeout(function() {$(selectors.bookmarkAlert).hide()}, 2000);
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
        var path = window.location.pathname;
        var scrollY  = window.scrollY;
        if (path !== '/' && scrollY > 130 && (prevScrollPos >= scrollY)) {
            $body.addClass('to-top-button');
        } else {
            $body.removeClass('to-top-button');
        }
        prevScrollPos = scrollY;
    }

    var orderBtnTexts = [
        'суры в обычном порядке',
        'суры в хроногическом порядке'
    ];

    var $orderBtn = $(selectors.orderBtn);
    var $list = Array.prototype.slice.call($('.sures li'));
    var $listOl = $('.sures ol');

    function compare(attribute) {
        return function (cur, next) {
            var $cur = $(cur).find('a');
            var $next = $(next).find('a');
            var comparator = Number($cur.data(attribute)) > Number($next.data(attribute));

            if(comparator) {
                return 1;
            }

            if(!comparator) {
                return -1;
            }
            return 0;
        }
    }

    function setOrder() {
        if ($orderBtn.text() === orderBtnTexts[0]) {
            $orderBtn.text(orderBtnTexts[1]);
            var result = $list.sort(compare('order'));

            if (result.length === 114) {
                $listOl.html(result);
            }

        } else {
            $orderBtn.text(orderBtnTexts[0]);
            var result = $list.sort(compare('chron'));

            if (result.length === 114) {
                $listOl.html(result);
            }
        }
    }

    function showOrderButton() {
        var path = window.location.pathname;
        if (path !== '/') {
            $orderBtn.hide();
        } else {
            $orderBtn.show();
        }
    }

    $(selectors.toTop).on('click', scrollToAnchor);
    $(selectors.bookmark).on('click', setBookmark);
    $orderBtn.on('click', setOrder);
    $(selectors.continueReading).on('click', toBookmark);
    $window.on('scroll', onScroll);

    scrollByHash();
    showBookmarkLink();
    showOrderButton();
}

$(document).ready(init);
