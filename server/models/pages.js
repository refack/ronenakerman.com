var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    url: { type: String, trim: true, lowercase: true, index: { unique: true }, label: 'URL' },
//    template: { type: String, enum: require('../views/templates'), label: 'תבנית'},
    title: { type: String, require: true, label: 'כותרת'},
    menu_title: { type: String, label: 'כותרת בתפריט'},

    text: { type: Types.Html, label: 'תוכן'},
    pictures: [{ picture: { type: Types.Picture, label: 'תמונה'} }],

    order: { type: Number, editable: false, label: 'סדר'},
    show: { type: Boolean, 'default': true, label: 'הצגה'}
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
    this.menu_title = this.menu_title || this.title;
    next();
});

module.exports = mongoose.model('pages', schema);