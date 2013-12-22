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
        res.locals.picture = _.sample(res.locals.config.homepage_pictures, 1)[0];
        res.render('index');
    });

    app.get('/:page?/:label?', function(req, res, next) {
        var url = req.params.page,
            label = req.params.label,
            page = _.find(res.locals.nav, {url: url});

        if (!page)
            return res.redirect('/');
        page.current = true;

        var type = page.articles_he ? 'pages' : 'galleries';
        models[type].findById(page._id).lean().exec(function(err, page) {
            if (err) return res.redirect('/');

            if (page.pictures)
                page.first = _.find(page.pictures, {label: label}) || page.pictures[0];

            if (page.articles_he || page.articles_en)
                page.first = _.find(page.articles_he, {title: label}) || _.find(page.articles_en, {title: label});

            return res.render(type == 'pages' ? 'page' : 'gallery', {page: page});
        });
    });

};
