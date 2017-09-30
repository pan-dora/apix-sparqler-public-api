const config = require('config');
const jsonld = require('./jsonld');

module.exports.getJsonLdDocument = function(request, response, callback) {
    const context = config.get('iiif.context');
    const collection = request.params.collection;
    const id = request.params.id;
    const apix_uri = config.get('iiif.service') + collection + '/' + id + '/manifest';
    jsonld.compact(apix_uri, context, function(error, compacted) {
        const out = JSON.stringify(compacted, null, 2);
        //temp fix until 3.0
        const rpl =  String(out);
        var re = new RegExp('"@type": "http://iiif.io/api/image/2/context.json"', 'g');
        const ctx = rpl.replace(re,'\"@context\": \"http://iiif.io/api/image/2/context.json\"');
        if (typeof callback === "function") {
            response.set('Content-Type', "application/ld+json");
            callback(response.statusCode, ctx, response);
        }
    });
};



