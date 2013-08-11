var router = function(cb, t) {
    var w = $(window).on('hashchange', function() {
        var params = location.hash.split('/').slice(1);
        cb.apply(null, params);
    });
    if (t) w.trigger('hashchange');
};

$.fn.hoverSlider = function(o) {
    o = $.extend({}, $.fn.hoverSlider.settings, o);

    var xy = o.orientation.toUpperCase(),
        prop = xy == 'X' ? 'width' : 'height',
        dir = xy == 'X' ? 'left' : 'top';

    var el = this.wrapInner('<div class="inner" />'),
        inner = $('.inner', el),
        slides = inner.children(),
        size = el[prop](),
        innerSize = o.slideSize * slides.length;

    inner.css(prop, innerSize);

    el.on('mousemove', function(e) {
        var x = e['client'+xy] - el.offset()[dir],
            offset = (x / size) * (innerSize - size);
        inner.css('-webkit-transform', 'translate'+xy+'(-'+offset+'px)');
    });
    return this;
};
$.fn.hoverSlider.settings = {
    slideSize: 100,
    orientation: 'x'
};
