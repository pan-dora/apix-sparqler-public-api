var express = require('express');
var router = express.Router();
var debug = require('debug')('routes');
var functions = require('../lib/functions');

router.get('/:collection/:id', function(req, res, next) {
    debug(req.url + " .get");
    functions.jsonldFrame(req, res, functions.sendResult);
});

module.exports = router;
