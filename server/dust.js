var dust = require('dustjs-linkedin'),
    cloudinary = require('cloudinary');

dust.optimizers.format = function(ctx, node) { return node };

/*
    Helpers
 */
// {@picture path="object.picture" width="150" height="150" crop="fill"/}
dust.helpers.picture = function (chunk, ctx, bodies, params) {
    params || (params = {});

    ctx = params.path
        ? ctx.get(params.path)
        : ctx.current();

    if (ctx.picture)
        ctx = ctx.picture;

    if (!ctx || !ctx.public_id)
        return chunk;

    params.format = params.format || ctx.format;

    return chunk.write(
        cloudinary.url(ctx.public_id, params)
    );
};

/*
    Filters
 */
dust.filters.st = function(value) {
    return value.stripTags();
};
dust.filters.br = function(value) {
    return value.replace(/\r\n/ig, '<br />');
};
dust.filters.comma = function(value) {
    return value.replace(/\,/g, '<br>');
};
dust.filters.dasherize = function(value){
    return value.dasherize();
};
dust.filters.lc = function(value){
    return value.toLowerCase();
};