var models = require('./models'),
    _ = require('lodash');

var nav = function(req, res, next) {
    models.pages.find({ show: true })
        .select('url title')
        .sort('order')
        .lean()
        .exec(function(err, pages) {
            if (err) return next(err);

            res.locals.nav = pages;
            next();
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
                return item.url == url;
            });
        console.log(url, res.locals.nav);

        if (!page)
            return next(new Error('No such page! '+url));

        var type = page.articles_he ? 'pages' : 'galleries';
        models[type].findById(page._id).lean().exec(function(err, doc) {
            if (err) return next(err);

            res.render(type == 'pages' ? 'page' : 'gallery', {
                page: page
            });
        });
    });

};