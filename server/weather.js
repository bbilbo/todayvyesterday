var http = require('http');
var _FreeApiKey = 'y3kmsjje2rtxbc4zc83af5kp';
var response_var;

exports.getTheWeather = function getTheWeather(query_str, res) {
  response_var = res;

  wwoGetLocalWeather(query_str);
};

function wwoGetLocalWeather(query_str) {
  console.log("function start: wwoGetLocalWeather()");

  var localWeatherInput = {
      query: query_str,
      format: 'JSON',
      num_of_days: '2',
      date: '',
      fx: '',
      cc: '',
      includelocation: '',
      show_comments: '',
      callback: 'wwoLocalWeatherCallback'
  };

  JSONP_LocalWeather(localWeatherInput);
}

JSONP_LocalWeather = function JSONP_LocalWeather(input) {
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

      var json_response = JSON.parse(str);

      var todays_temp = 0;

      if (json_response && json_response.data && json_response.data.current_condition
        && json_response.data.current_condition[0] && json_response.data.current_condition[0].temp_F) {
        todays_temp = json_response.data.current_condition[0].temp_F;
      }

      //response_var.json(json_response);

      console.log("todays_temp: " + todays_temp);

      response_var.jsonp({ todays_temp : todays_temp});
    });
  }

  http.request(options, callback).end();
}

function wwoLocalWeatherCallback(localWeather) {

  todays_temp = localWeather.data.current_condition[0].temp_F;
  
  response_var.jsonp({ todays_temp : todays_temp});
}