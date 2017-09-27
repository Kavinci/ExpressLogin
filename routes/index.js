'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Login', greeting: 'Welcome Friend!', location: 'apartment 81D', today: new Date()});
});

module.exports = router;
