const express = require('express');
const router = express.Router();
const http = require('http');
const https = require('https');
const request = require('request');



const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
    const renderObject = {};
    renderObject.title = 'AppThis';

    res.render('index', renderObject);
});
router.get('/pubs', function (req, res, next) {
    const renderObject = {};

    var dateStart = req.query.dateOne;
    var dateEnd = req.query.dateTwo;
    var amId = req.query.amId;
    var url = `http://localhost:5000/pub?date.start=${dateStart}&date.end=${dateEnd}&amId=${amId}`;

    console.log(url);

    request(url, function (error, response, body) {
        renderObject.pubs = JSON.parse(body).records;
        res.render('pubTable', renderObject);
    });
});


router.get('/pubDrill/:id', function (req, res, next) {
    const renderObject = {};
    const pubId = parseInt(req.params.id);


    var dateStart = req.query.dateOne;
    var dateEnd = req.query.dateTwo;
    var amId = req.query.amId;
    var url = `http://localhost:5000/pub/${pubId}?date.start=${dateStart}&date.end=${dateEnd}&amId=${amId}`;

    console.log(url);

    request(url, function (error, response, body) {
        renderObject.all = JSON.parse(body);
        res.render('secondaryTables', renderObject);
    });
});


module.exports = router;
