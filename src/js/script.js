jQuery(function ($) {

    var html = $('html');
    var body = $('body');

    var currentActiveTarget;

    function hideOverlay(target) {
        target.removeClass('active');
        html.removeClass('menu-active');
        setTimeout(function () {
            target.removeClass('initial');
            html.removeClass('menu-initial');
        }, 300);
        currentActiveTarget = undefined;
        searchIntegration.clear();
    }

    function showOverlay(target) {
        html.addClass('menu-initial');
        target.addClass('initial');
        setTimeout(function () {
            html.addClass('menu-active');
            target.addClass('active');
        }, 1);
        currentActiveTarget = target;
    }

    /* ==========================================================================
     Menu Function
     ========================================================================== */

    body.on('click', '[data-action="overlay"]', function () {
        var action = $(this).data('action');
        var type = $(this).data('target');
        var target = $('[data-target="' + type + '"]').not('[data-action]');
        toggleOverlay(target);
    });

    body.on('click', '.overlay, #menu a, #search a', function () {
        if (html.hasClass('menu-active') && currentActiveTarget) {
            hideOverlay(currentActiveTarget);
        }
    });

    function toggleOverlay(target) {
        if (currentActiveTarget) {
            return hideOverlay(target);
        }

        showOverlay(target);
    }

    /* ==========================================================================
     Current Menu Item
     ========================================================================== */

    /*
     Actually this should be handled by GHost itself, but the {{current}} handler doesn't
     work as aspected everytime so I add this little FUnction to fix this on the client side.
     */

    function currentMenuFix() {
        $('.menu-list-item a').each(function () {
            var link = $(this);
            link.removeClass('current');
            if (link.attr('href') == window.location.href) {
                link.addClass('current');
            }
        });
    }

    currentMenuFix();

    /* ==========================================================================
     Fitvids
     ========================================================================== */

    function video() {
        $('#wrapper').fitVids();
    }

    video();

    /* ==========================================================================
     Reading Time
     ========================================================================== */

    function readingTime() {
        // Don't execute on the front page
        if (location.pathname === '/') {
            return;
        }

        var post = body.find('article');
        var postReadingTime = post.find('.reading-time');
        var postContent = post.find('.post-content');

        postContent.readingTime({
            readingTimeTarget: postReadingTime.find('.estimated-reading-time'),
            wordCountTarget: postReadingTime.find('.word-count'),
            error: function () {
                postReadingTime.find('.reading-time').remove();
            }
        });
    }

    readingTime();


    /* ==========================================================================
 	   Masonry
 	   ========================================================================== */

    function grid() {
        var postlist = $('.post-list').masonry({
            itemSelector: '.post',
            isAnimated: false,
            gutter: 0,
            columnWidth: 1,
            transitionDuration: 0
        }).imagesLoaded().always(function () {
            postlist.masonry('layout');
        });
    }

    grid();

    /* ==========================================================================
     Reload all scripts after AJAX load
     ========================================================================== */

    function reload() {
        grid();
        ajaxLinkClass();
        video();
        highlight();
        currentMenuFix();
        readingTime();
    }

    /* ==========================================================================
     Add class for ajax loading
     ========================================================================== */

    function ajaxLinkClass() {

        $('a[href^="' + window.location.origin + '"], .post-image a, .post-title a, .post-more a, .post-meta a, .post-tags a, #pagination a').each(function () {
            var link = $(this);

            if (!link.hasClass('rss')) {
                link.addClass('js-ajax-link');

                if (link.attr('href').indexOf('page') > -1) {
                    link.addClass('js-archive-index');
                }

                if (link.attr('href') == window.location.origin) {
                    link.addClass('js-show-index');
                }

                if (link.attr('href').indexOf('tag') > -1) {
                    link.addClass('js-tag-index');
                }

                if (link.attr('href').indexOf('author') > -1) {
                    link.addClass('js-author-index');
                }
            }
        });
    }

    ajaxLinkClass();

    /* ==========================================================================
     Ajax Loading
     ========================================================================== */

    var History = window.History;
    var loading = false;
    var ajaxContainer = $('#ajax-container');

    if (!History.enabled) {
        return false;
    }

    History.Adapter.bind(window, 'statechange', function () {
        html.addClass('loading');
        var State = History.getState();
        $.get(State.url, function (result) {
            var $html = $(result);
            var newContent = $('#ajax-container', $html).contents();
            var title = result.match(/<title>(.*?)<\/title>/)[1];

            ajaxContainer.fadeOut(500, function () {
                if (html.hasClass('push-next')) {
                    html.removeClass('push-next');
                    html.addClass('pushed-next');
                }
                if (html.hasClass('push-prev')) {
                    html.removeClass('push-prev');
                    html.addClass('pushed-prev');
                }
                document.title = $('<textarea/>').html(title).text();
                ajaxContainer.html(newContent);
                body.removeClass();
                body.addClass($('#body-class').attr('class'));
                NProgress.done();
                ajaxContainer.fadeIn(500);
                $(document).scrollTop(0);
                setTimeout(function () {
                    html.removeClass('loading');
                }, 50);
                reload();
                loading = false;

                sendPageView(State.hash);
            });
        });
    });

    body.on('click', '.js-ajax-link', function (e) {
        e.preventDefault();

        var link = $(this);

        if (link.hasClass('post-nav-item') || link.hasClass('pagination-item')) {
            if (link.hasClass('post-nav-next') || link.hasClass('pagination-next')) {
                html.removeClass('pushed-prev');
                html.addClass('push-next');
            }
            if (link.hasClass('post-nav-prev') || link.hasClass('pagination-prev')) {
                html.removeClass('pushed-next');
                html.addClass('push-prev');
            }
        } else {
            html.removeClass('pushed-next');
            html.removeClass('pushed-prev');
        }

        if (loading === false) {
            var currentState = History.getState();
            var url = $(this).prop('href');
            var title = $(this).attr('title') || null;

            if (url.replace(/\/$/, '') !== currentState.url.replace(/\/$/, '')) {
                loading = true;
                html.addClass('loading');
                NProgress.start();
                History.pushState({}, title, url);
            }
        }
    });

    body.on('click', '#post-index .post .js-ajax-link', function () {
        var post = $(this).parents('.post');
        post.addClass('initial');
        setTimeout(function () {
            post.addClass('active');
        }, 1);
    });

    function sendPageView(url) {
        if (!window.ga) {
            return;
        }

        window.ga('send', 'pageview', url);
    }

    function highlight() {
        if (!window.Prism) {
            return;
        }

        // Wait a short time before trying to highlight
        setTimeout(function () {
            window.Prism.highlightAll();
        }, 100);
    }

    highlight();

    var searchIntegration = {
        getInputAndElement: function () {
            var input = document.getElementById('cse-search-input-box-id');
            var element = google.search.cse.element.getElement('searchresults-only0');

            return {
                input: input,
                element: element
            };
        },

        execute: function () {
            var inputElement = searchIntegration.getInputAndElement();

            if (inputElement.input.value == '') {
                inputElement.element.clearAllResults();
            } else {
                inputElement.element.execute(inputElement.input.value);
            }
            return false;
        },

        clear: function () {
            var inputElement = searchIntegration.getInputAndElement();

            inputElement.element.clearAllResults();
        }
    };

    window.searchIntegration = searchIntegration;
});
