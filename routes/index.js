const express = require('express');
const router = express.Router();
const debug = require('debug')('routes');
const functions = require('../lib/functions');

router.get('/:collection/:id', function(req, res, next) {
    debug(req.url + " .get");
    functions.getJsonLdDocument(req, res, functions.sendResult);
});

module.exports = router;
