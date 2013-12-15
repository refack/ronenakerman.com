var router = function(cb, t) {
    var w = $(window).on('hashchange', function() {
        var params = location.hash.split('/').slice(1);
        cb.apply(null, params);
    });
    if (t) w.trigger('hashchange');
};
