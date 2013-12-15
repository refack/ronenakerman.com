var models = require('./models'),
    _ = require('lodash');

var nav = function(req, res, next) {
    var i = 0,
        nav = {};

    ['pages', 'galleries'].forEach(function(name) {
        models[name].find({ show: true })
            .select('url title articles_he')
            .sort('order')
            .lean()
            .exec(function(err, docs) {
                nav[name] = docs;
                nav.err = err;

                if (++i < 2) return;
                if (nav.err) return next(err);

                res.locals.nav = nav.galleries.concat(nav.pages);
                next();
            });
    });
};

module.exports = function(app) {

    app.get('*', models.config.middleware, nav);

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res, next) {
        var url = req.params[0],
            page = _.find(res.locals.nav, function(item) {
                if (item.url == url)
                    return item.current = true;
            });

        if (!page)
            return res.redirect('/');

        var type = page.articles_he ? 'pages' : 'galleries';
        models[type].findById(page._id).lean().exec(function(err, page) {
            if (err || !page) return res.redirect('/');

            if (page.pictures)
                page.first = page.pictures[0];

            res.render(type == 'pages' ? 'page' : 'gallery', {
                page: page
            });
        });
    });

};
