var config = require('./config.js');
var flock = require('flockos');
var express = require('express');
var store = require('./store.js');
var chrono = require('chrono-node');
var Mustache = require('mustache');
var fs = require('fs');
var util = require('util');

flock.appId = config.appId;
flock.appSecret = config.appSecret;

var app = express();
app.use(flock.events.tokenVerifier);
app.post('/events', flock.events.listener);

app.listen(3000, function () {
    console.log('Listening on 3000');
});

flock.events.on('app.install', function (event, callback) {
    store.saveToken(event.userId, event.token);
    callback();
});


app.get('/postmates', function (req, res) {
    var event = JSON.parse(req.query.flockEvent);

    res.redirect('https://postmates.com/san-francisco');
});
