var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    title: { type: String, required: true },
    email: { type: String, required: true },
    credits: String
});

schema.statics.middleware = function(req, res, next) {
    model.findOne(function(err, config) {
        res.locals.config = config;
        next(err);
    });
};

var model = module.exports = mongoose.model('config', schema);
model.single = true;