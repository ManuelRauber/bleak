jQuery(function(a){function b(a){l?(a.removeClass("active"),j.removeClass("menu-active"),setTimeout(function(){a.removeClass("initial"),j.removeClass("menu-initial")},300),l=!1):(j.addClass("menu-initial"),a.addClass("initial"),setTimeout(function(){j.addClass("menu-active"),a.addClass("active")},1),l=!0)}function c(){a(".menu-list-item a").each(function(){var b=a(this);b.removeClass("current"),b.attr("href")==window.location.href&&b.addClass("current")})}function d(){var b=a(".post-list").masonry({itemSelector:".post",isAnimated:!1,gutter:0,columnWidth:1,transitionDuration:0}).imagesLoaded().always(function(){b.masonry("layout")})}function e(){a("pre code").each(function(b,c){hljs.highlightBlock(c);var d=a(this),e=d.html().split(/\n/).length,f=[];for(b=1;e>b;b++)f+='<span class="line">'+b+"</span>";d.parent().addClass("codeblock").append('<div class="lines">'+f+"</div>")})}function f(){a("#wrapper").fitVids()}function g(){"undefined"==typeof disqus?a(".post-comments").css({display:"none"}):a.ajax({type:"GET",url:"//"+disqus+".disqus.com/embed.js",dataType:"script",cache:!0})}function h(){d(),i(),e(),f(),g(),c()}function i(){a('a[href^="'+window.location.origin+'"], .post-image a, .post-title a, .post-more a, .post-meta a, .post-tags a, #pagination a').each(function(){var b=a(this);b.hasClass("rss")||(b.addClass("js-ajax-link"),b.attr("href").indexOf("page")>-1&&b.addClass("js-archive-index"),b.attr("href")==window.location.origin&&b.addClass("js-show-index"),b.attr("href").indexOf("tag")>-1&&b.addClass("js-tag-index"),b.attr("href").indexOf("author")>-1&&b.addClass("js-author-index"))})}var j=a("html"),k=a("body");k.on("click",'[data-action="menu"]',function(){var c=(a(this).data("action"),a('[data-target="'+a(this).data("target")+'"]').not("[data-action]"));b(c)});var l=!1;k.on("click",".overlay, #menu a",function(){if(j.hasClass("menu-active")){var c=a('[data-target="menu"]').not("[data-action]");b(c)}}),c(),d(),e(),f(),g(),i();var m=window.History,n=!1,o=a("#ajax-container");return m.enabled?(m.Adapter.bind(window,"statechange",function(){j.addClass("loading");var b=m.getState();a.get(b.url,function(b){var c=a(b),d=a("#ajax-container",c).contents(),e=b.match(/<title>(.*?)<\/title>/)[1];o.fadeOut(500,function(){j.hasClass("push-next")&&(j.removeClass("push-next"),j.addClass("pushed-next")),j.hasClass("push-prev")&&(j.removeClass("push-prev"),j.addClass("pushed-prev")),document.title=a("<textarea/>").html(e).text(),o.html(d),k.removeClass(),k.addClass(a("#body-class").attr("class")),NProgress.done(),o.fadeIn(500),a(document).scrollTop(0),setTimeout(function(){j.removeClass("loading")},50),h(),n=!1})})}),a("body").on("click",".js-ajax-link",function(b){b.preventDefault();var c=a(this);if(c.hasClass("post-nav-item")||c.hasClass("pagination-item")?((c.hasClass("post-nav-next")||c.hasClass("pagination-next"))&&(j.removeClass("pushed-prev"),j.addClass("push-next")),(c.hasClass("post-nav-prev")||c.hasClass("pagination-prev"))&&(j.removeClass("pushed-next"),j.addClass("push-prev"))):(j.removeClass("pushed-next"),j.removeClass("pushed-prev")),n===!1){var d=m.getState(),e=a(this).prop("href"),f=a(this).attr("title")||null;e.replace(/\/$/,"")!==d.url.replace(/\/$/,"")&&(n=!0,j.addClass("loading"),NProgress.start(),m.pushState({},f,e))}}),void a("body").on("click","#post-index .post .js-ajax-link",function(){var b=a(this).parents(".post");b.addClass("initial"),setTimeout(function(){b.addClass("active")},1)})):!1});
