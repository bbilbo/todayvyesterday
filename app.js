var express = require('express');
var app = express();

var mailer = require('express-mailer');

mailer.extend(app, {
  from: 'devbilbo@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'devbilbo@gmail.com',
    pass: 'yewrE8uv'
  }
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var weather = require('./server/weather');
var yweather = require('./server/yweather');

app.use(express.cookieParser());
//app.use(app.router);

app.get('/', function(req, res) {
  console.log("*****")
  console.log("*****")
  console.log("*****")
	console.log('*** A user is requesting / .. (index.html)');
  if (req.cookies.user_id) {
    console.log("req.cookies.user_id: " + req.cookies.user_id);
  }
  console.log("*****")
  console.log("*****")
  console.log("*****")
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
  console.log("api call: weather w");

  if (req.cookies.user_id) {
    console.log("req.cookies.user_id: " + req.cookies.user_id);
  }

  var query = req.params[0];

  console.log("query: " + query);

  weather.getTheWeather(query, res);
})

app.get(/^\/weather\/(.+)$/, function(req, res) {
  console.log("api call: weather .");

  if (req.cookies.user_id) {
    console.log("req.cookies.user_id: " + req.cookies.user_id);
  }

  var query = req.params[0];

  console.log("query: " + query);

  weather.getTheWeather(query, res);
})




app.get(/^\/yweather\/(\w+)\/(\w+)$/, function(req, res) {
  console.log("api call: yweather w");

  if (req.cookies.user_id) {
    console.log("req.cookies.user_id: " + req.cookies.user_id);
  }

  var query = req.params[0];
  var hour = req.params[1];

  console.log("query: " + query);
  console.log("hour: " + hour);

  yweather.getYWeather(query, hour, res);
})

app.get(/^\/yweather\/(.+)\/(.+)$/, function(req, res) {
  console.log("api call: yweather .");

  if (req.cookies.user_id) {
    console.log("req.cookies.user_id: " + req.cookies.user_id);
  }

  var query = req.params[0];
  var hour = req.params[1];

  console.log("query: " + query);
  console.log("hour: " + hour);

  yweather.getYWeather(query, hour, res);
})




app.get(/^\/error_occurred\/$/, function(req, res) {
  console.log("api call: error_occurred");

  if (req.cookies.user_id) {
    console.log("req.cookies.user_id: " + req.cookies.user_id);
  }

  var error_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });;

  console.log("*****");
  console.log("*****");
  console.log("error_id: " + error_id);
  console.log("*****");
  console.log("*****");

  // send error email now
  app.mailer.send('email', {
    to: 'devbilbo@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
    subject: 'Error occurred for user ' + req.cookies.user_id, // REQUIRED.
    otherProperty: 'Other Property', // All additional properties are also passed to the template as local variables.
    user_id: req.cookies.user_id,
    error_id: error_id
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      //res.send('There was an error sending the email');
      console.log('There was an error sending the email');
      res.jsonp({ email_sent : false});
      return;
    }
    //res.send('Email Sent');
    console.log('Email Sent');
    res.jsonp({ email_sent : true});
  });
})




app.get('/ba.html', function(req, res) {
  res.sendfile('ba.html');
});

app.get('/ba_remarketing.html', function(req, res) {
  res.sendfile('ba_remarketing.html');
});







var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ' + port);

console.log("Let's begin waiting for requests")
console.log("*****")
console.log("*****")
console.log("*****")