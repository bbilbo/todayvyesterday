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

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);

