var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.get('/index2.html', function(req, res) {
	res.sendfile('index2.html');
});

app.get('/test.html', function(req, res) {
	res.sendfile('test.html');
});

app.get('/test2.html', function(req, res) {
	res.sendfile('test2.html');
});

app.get('/images/background.png', function(req, res) {
	res.sendfile('images/background.png');
});

app.get('/images/background_blue.png', function(req, res) {
	res.sendfile('images/background_blue.png');
});

app.get('/node_modules/async/lib/async.js', function(req, res) {
	console.log('Request for async.js');
	res.sendfile('node_modules/async/lib/async.js');
});

app.get('/button.css', function(req, res) {
	res.sendfile('button.css');
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ' + port);

