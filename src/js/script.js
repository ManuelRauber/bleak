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

    body.on('click', '[data-action="menu"]', function() {
        var type = $(this).data('target');
        var target = $('[data-target="' + type + '"]').not('[data-action]');
        toggleOverlay(target);
    });


    body.on('click', '.overlay, #menu a, #search a', function() {
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
        gallery();
        highlight();
        currentMenuFix();
        integrateGhostHunter();
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
	   Gallery
	   ========================================================================== */

    function gallery() {
        var images = document.querySelectorAll('.kg-gallery-image img');
        images.forEach(function (image) {
            var container = image.closest('.kg-gallery-image');
            var width = image.attributes.width.value;
            var height = image.attributes.height.value;
            var ratio = width / height;
            container.style.flex = ratio + ' 1 0%';
        });
    }
    gallery();

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

    var search;
    function integrateGhostHunter() {
        if (search) {
            search.reset();
            search = void 0;
        }

        search = $("#search-field").ghostHunter({
            results: '#results',
            onKeyUp: true,
            onPageLoad: false,
            result_template: '<hr><a href="{{link}}" class="search-result"><h2>{{title}}</h2><h4>{{pubDate}}</h4><p class="description">{{description}}</p></a>',
            info_template: '<p class="result-length">Number of posts found: {{amount}}</p>',
        });
    }

    integrateGhostHunter();
});
