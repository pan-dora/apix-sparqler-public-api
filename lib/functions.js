const config = require('config');
const http = require('http');
const https = require('https');
const jsonld = require('./jsonld');
const debug = require('debug')('functions');

module.exports.getJsonLdDocument = function(request, response, callback) {
    const context = config.get('iiif.context');
    const collection = request.params.collection;
    const id = request.params.id;
    const apix_uri = config.get('iiif.service') + collection + '/' + id + '/manifest';
    jsonld.compact(apix_uri, context, function(error, compacted) {
        const out = JSON.stringify(compacted, null, 2);
        if (typeof callback === "function") {
            response.set('Content-Type', "application/ld+json");
            callback(response.statusCode, out, response);
        }
    });
};



