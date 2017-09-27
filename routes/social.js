'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/facebook', function (req, res) {
    userId = req;
    //user id check process goes here
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/instagram', function (req, res) {
    userId = req;
    //user id check process goes here
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/linkedIn', function (req, res) {
    userId = req;
    //user id check process goes here
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/twitter', function (req, res) {
    userId = req;
    //user id check process goes here
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/google', function (req, res) {
    userId = req;
    //user id check process goes here
    res.send('respond with a resource');
});

module.exports = router;