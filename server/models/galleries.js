var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    url: { type: String, trim: true, lowercase: true, index: { unique: true }, label: 'URL' },
    title: { type: String, require: true },
    background: Types.Picture,

    pictures: {type:[{
        picture: Types.Picture,
        youtube: String,
        label: String,
        gallery: {type: [{
            picture: Types.Picture,
            youtube: String,
            label: String
        }], stackDir: 'top'}
    }], stackDir: 'top'},


    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

/*
schema.methods.toString = function(){
    return this.title;
};
*/

schema.pre('save', function(next) {
    var url = this.url;
    if (!url)
        url = this.title;

    url = url.replace(/[ \-]+/g, '-');
    this.url = url;
    next();
});

schema.formage = {
    sortable: 'order'
};

module.exports = mongoose.model('galleries', schema);
