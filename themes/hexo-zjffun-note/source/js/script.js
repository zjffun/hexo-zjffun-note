'use strict';

(function ($) {
  // Share
  $('body')
    .on('click', function () {
      $('.article-share-box.on').removeClass('on');
    })
    .on('click', '.article-share-link', function (e) {
      e.stopPropagation();

      var $this = $(this),
        url = $this.attr('data-url'),
        encodedUrl = encodeURIComponent(url),
        id = 'article-share-box-' + $this.attr('data-id'),
        offset = $this.offset(),
        box;

      if ($('#' + id).length) {
        box = $('#' + id);

        if (box.hasClass('on')) {
          box.removeClass('on');
          return;
        }
      } else {
        var html = [
          '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
          '<a href="https://twitter.com/intent/tweet?url=' +
            encodedUrl +
            '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
          '<a href="https://www.facebook.com/sharer.php?u=' +
            encodedUrl +
            '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
          '<a href="http://pinterest.com/pin/create/button/?url=' +
            encodedUrl +
            '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
          '<a href="https://plus.google.com/share?url=' +
            encodedUrl +
            '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
          '</div>'
        ].join('');

        box = $(html);

        $('body').append(box);
      }

      $('.article-share-box.on').hide();

      box
        .css({
          top: offset.top + 25,
          left: offset.left
        })
        .addClass('on');
    })
    .on('click', '.article-share-box', function (e) {
      e.stopPropagation();
    })
    .on('click', '.article-share-box-input', function () {
      $(this).select();
    })
    .on('click', '.article-share-box-link', function (e) {
      e.preventDefault();
      e.stopPropagation();

      window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
    });

  // back to top
  var $backToTop = $('<div class="back-to-top" title="返回顶部"></div>')
    .appendTo($('body'))
    .on('click', function (e) {
      e.preventDefault();
      window.scrollTo(0, 0);
    });

  $(document).on('scroll', function () {
    var scrollTop = window.scrollY;
    if (scrollTop > 300) {
      $backToTop.show();
    } else {
      $backToTop.hide();
    }
  });

  // Mobile toc
  var $container = $('.toc-wrapper'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  $('.toc-toggle').on('click', function () {
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    if ($container.hasClass('showing')) {
      $container.removeClass('showing').hide(200);
    } else {
      $container.addClass('showing').show(200);
    }
    stopMobileNavAnim();
  });
})(jQuery);
