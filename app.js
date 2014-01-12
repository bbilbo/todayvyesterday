var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.get('/index2.html', function(req, res) {
	res.sendfile('index2.html');
});

app.get('/node_modules/async/lib/async.js', function(req, res) {
	console.log('Request for async.js');
	res.sendfile('node_modules/async/lib/async.js');
});

app.listen(3000);
console.log('Listening on port 3000');

