var express = require('express');
var app = express();

app.set('views', __dirname + '/../views');

var connection = require('../../../mongo.js');
var initDb = connection.initDb;
var getDbData = connection.getDbData;
var db = null;
var dbDetails = {};

var setDbData = function() {
    var dbRet = getDbData();
    db = dbRet[0];
    dbDetails = dbRet[1];
};

app.get('/', function (req, res) {
    setDbData();
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function (err) { });
        setDbData();
    }
    if (db) {
        var col = db.collection('counts');
        // Create a document with request IP and current time of request
        col.insert({ ip: req.ip, date: Date.now() });
        col.count(function (err, count) {
            if (err) {
                console.log('Error running count. Message:\n' + err);
            }
            res.render('index.html', { pageCountMessage: count, dbInfo: dbDetails });
        });
    } else {
        res.render('index.html', { pageCountMessage: null });
    }
});

app.get('/pagecount', function (req, res) {
    setDbData();
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function (err) { });
        setDbData();
    }
    if (db) {
        db.collection('counts').count(function (err, count) {
            res.send('{ pageCount: ' + count + '}');
        });
    } else {
        res.send('{ pageCount: -1 }');
    }
});

module.exports = app;