$.fn.hoverSlider = function(o) {
    o = $.extend({}, $.fn.hoverSlider.settings, o);
    var t = this.wrapInner('<div class="inner" />'),
        width = t.width()/* - o.buffer*/,
        inner = $('.inner', t),
        slides = inner.children(),
        y = o.slideWidth * slides.length;

    inner.css('width', y);

    t.on('mousemove', function(e) {
        var x = e.clientX - t.offset().left,
            offset = (x / width) * (y - width)/* - o.buffer*/;
        inner.css('-webkit-transform', 'translateX(-'+offset+'px)');
        //            t.scrollLeft(offset);
    });
    return this;
};
$.fn.hoverSlider.settings = {
    slideWidth: 100,
    buffer: 10
};

var router = function(cb, t) {
    var w = $(window).on('hashchange', function() {
        var params = location.hash.split('/').slice(1);
        cb.apply(null, params);
    });
    if (t) w.trigger('hashchange');
};