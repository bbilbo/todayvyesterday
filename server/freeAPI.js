var http = require('http');

var _host = 'api.worldweatheronline.com';
var _path = '/free/v1/';
var _FreeApiBaseURL = 'http://api.worldweatheronline.com/free/v1/';
var _FreeApiKey = 'y3kmsjje2rtxbc4zc83af5kp';

// -------------------------------------------

exports.JSONP_LocalWeather = function JSONP_LocalWeather(input) {
  var options = {
    host: 'api.worldweatheronline.com',
    path: '/free/v1/weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&num_of_days=' + input.num_of_days + '&date=' + input.date + '&fx=' + input.fx + '&cc=' + input.cc + '&includelocation=' + input.includelocation + '&show_comments=' + input.show_comments + '&key=' + _FreeApiKey
  };
  
  callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log(str);
    });
  }

  http.request(options, callback).end();
}