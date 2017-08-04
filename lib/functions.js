const config = require('config');
const http = require('http');
const https = require('https');
const jsonld = require('./jsonld');
const debug = require('debug')('functions');

module.exports.getJsonLdDocument = function(request, response, callback) {
    debug(request.url + " frame");
    const options = {};
    let result = "";
    let scheme = {};
    if (config.get('endpoints.system.scheme') === 'http') {
        scheme = http
    } else {
        scheme = https
    }
    const req = scheme.request(options, (res) => {
        res.on('data', (data) => {
            result += data;
        });
        res.on('end', () => {
            context = config.get('iiif.context');
            const collection = request.params.collection;
            const id = request.params.id;
            const apix_uri = config.get('iiif.service') + collection + '/' + id + '/manifest';
            jsonld.compact(apix_uri, context, function(error, compacted) {
                const out = JSON.stringify(compacted, null, 2);
                if (typeof callback === "function") {
                    response.set('Content-Type', "application/ld+json");
                    res.statusCode = 200;
                    callback(res.statusCode, out, response, request);
                }
            });
        })
    });
    req.end();
};

module.exports.sendResult = function(statusCode, result, response) {
    response
        .status(statusCode)
        .send(result);
};

