var config = require('config');
var http = require('http');
var https = require('https');
var jsonld = require('./jsonld');
var debug = require('debug')('functions');

module.exports.jsonldFrame = function(request, response, callback) {
    debug(request.url + " frame");
    var options = {};
    var result = "";
    var scheme = {};
    if (config.get('endpoints.system.scheme') === 'https') {
        scheme = https
    } else {
        scheme = http
    }
    var req = scheme.request(options, (res) => {
        res.on('data', (data) => {
            result += data;
        });
        res.on('end', () => {
            frame = config.get('iiif.frame');
            var collection = request.params.collection;
            var id = request.params.id;
            var apix_uri = config.get('iiif.service')+ collection + '/' + id + '/manifest';
            jsonld.frame(apix_uri, frame, function(error, framed) {
                var out = JSON.stringify(framed, null, 2);
                if (typeof callback === "function") {
                    response.set('Content-Type', "application/ld+json");
                    callback(res.statusCode, out, response, request);
                }
            });
        })
    });   
    req.end();
};

module.exports.sendResult = function(statusCode, result, response, request) {
    response
        .status(statusCode)
        .send(result);
};

