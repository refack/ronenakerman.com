var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    url: { type: String, trim: true, lowercase: true, index: { unique: true }, label: 'URL' },
    title: { type: String, require: true },
    background: Types.Picture,

    pictures: [{
        picture: Types.Picture,
        youtube: String,
        label: String,
        gallery: [{
            picture: Types.Picture,
            youtube: String,
            label: String
        }]
    }],


    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

schema.methods.toString = function(){
    return this.title;
};

schema.pre('save', function(next) {
    var url = this.url;
    if (!url)
        url = '/' + this.title;

    url = url.replace(/[ \-]+/g, '-');
    if (url.substr(0,1) !== '/')
        url = '/' + url;

    this.url = url;
    next();
});

schema.formage = {
    sortable: 'order'
};

module.exports = mongoose.model('galleries', schema);
