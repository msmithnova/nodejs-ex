//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');

require('dotenv').config();

Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var example_app = require('./projects/example/controllers/example.js');
app.use('/example', example_app);

app.use(express.static(__dirname + '/public'));

// catch for invalid routes
app.get('*', function(req, res) {
  res.send('This is not the page you are looking for.');
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

// connect to database
var connection = require('./mongo.js');
var initDb = connection.initDb;
initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
