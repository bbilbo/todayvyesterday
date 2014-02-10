var express = require('express');
var app = express();

var weather = require('./server/weather');


app.get('/', function(req, res) {
	console.log('Request for index.html');
	res.sendfile('index.html');
});

app.get('/dev/', function(req, res) {
  console.log('Request for index_dev.html');
  res.sendfile('index_dev.html');
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
	res.sendfile('node_modules/async/lib/async.js');
});




app.get('/button.css', function(req, res) {
	res.sendfile('button.css');
});

app.get('/css/main.css', function(req, res) {
	res.sendfile('css/main.css');
});




app.get('/script/helper.js', function(req, res) {
	res.sendfile('script/helper.js');
});
app.get('/script/location.js', function(req, res) {
	res.sendfile('script/location.js');
});
app.get('/script/weather.js', function(req, res) {
	res.sendfile('script/weather.js');
});
app.get('/script/main.js', function(req, res) {
	res.sendfile('script/main.js');
});



var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];

app.get('/api1', function(req, res) {
  res.json(quotes);
});

app.get('/api2', function(req, res) {
  var id = Math.floor(Math.random() * quotes.length);
  var q = quotes[id];
  res.json(q);
});




app.get('/testPremiumAPI.htm', function(req, res) {
	res.sendfile('testPremiumAPI.htm');
});

app.get('/script/premiumAPI.js', function(req, res) {
	res.sendfile('script/premiumAPI.js');
});


app.get('/testFreeAPI.htm', function(req, res) {
	res.sendfile('testFreeAPI.htm');
});

app.get('/script/freeAPI.js', function(req, res) {
	res.sendfile('script/freeAPI.js');
});


app.get('/geocoding-simple.html', function(req, res) {
	res.sendfile('geocoding-simple.html');
});




app.get(/^\/weather\/(\w+)$/, function(req, res) {
  var query = req.params[0];

  console.log("query: " + query);

  weather.getTheWeather(query, res);
})

app.get(/^\/weather\/(.+)$/, function(req, res) {
  var query = req.params[0];

  console.log("query: " + query);

  weather.getTheWeather(query, res);
})




var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ' + port);

