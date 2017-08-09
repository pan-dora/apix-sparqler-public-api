const express = require('express');
const router = express.Router();
const functions = require('../lib/functions');
const config = require('config');
const redis = require('redis');
const client = redis.createClient(6379, config.get('redis.server'));

router.get('/:collection/:id', function(req, res, next) {
    client.get(req.params.id, function(error, manifest) {
        if (error) {
            throw error;
        }
        if (manifest && manifest !== "undefined") {
            res.setHeader('Content-Type', 'application/ld+json');
            res.json(JSON.parse(manifest));
        } else {
            functions.getJsonLdDocument(req, res, function(statusCode, result, response) {
                if (statusCode === 200) {
                    res.setHeader('Content-Type', 'application/ld+json');
                    response.send(result);
                    client.set(req.params.id, result, function(error) {
                        if (error) {
                            throw error;
                        }
                    });
                } else {
                    response.status(statusCode);
                }
            });
        }
    });
});

module.exports = router;
