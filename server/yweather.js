var http = require('http');
var _PremiumApiKey = '994rwc7yxed454zh8ft7emya';
var response_var;

exports.getYWeather = function getYWeather(query_str, res) {
  response_var = res;

  wwoGetYesterdayWeather(query_str);
};

function wwoGetYesterdayWeather(query_str) {
  console.log("function start: wwoGetYesterdayWeather()");

  var pastWeatherInput = {
      query: query_str,
      format: 'JSON',
      enddate: '2014-02-08',
      date: '2014-02-08',
      extra: '',
      includelocation: '',
      show_comments: '',
      callback: 'wwoPastWeatherCallback'
  };

  JSONP_PastWeather(pastWeatherInput);
}

function JSONP_PastWeather(input) {
  var options = {
    host: 'api.worldweatheronline.com',
    path: '/premium/v1/past-weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&date=' + input.date + '&enddate=' + input.enddate + '&includelocation=' + input.includelocation + '&key=' + _PremiumApiKey
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

      var pastWeather = JSON.parse(str);

      var yesterdays_temp = 0;





      //if (json_response && json_response.data && json_response.data.current_condition
      //  && json_response.data.current_condition[0] && json_response.data.current_condition[0].temp_F) {
      //  todays_temp = json_response.data.current_condition[0].temp_F;
      //}

      //response_var.json(json_response);

      

      //////////




      var hourlys = pastWeather.data.weather[0].hourly.length;
  
      console.log("hourlys :" + hourlys);
      
      var current_date = new Date();
      var current_hour = current_date.getHours();

      console.log("current_hour :" + current_hour);

      var done = false;

      var previous_hour;
      var previous_temp;

      for(ii = 0; ii < hourlys && !done; ii++) {
        var ii_hour = Number(pastWeather.data.weather[0].hourly[ii].time) / 100;
        var ii_temp = Number(pastWeather.data.weather[0].hourly[ii].tempF);

        if (ii_hour == current_hour) {
          done = true;
          yesterdays_temp = ii_temp;
        } else if (current_hour < ii_hour && ii == 0) {
          done = true;
          yesterdays_temp = ii_temp;
        } else if (ii_hour < current_hour && ii == hourlys - 1) {
          done = true;
          yesterdays_temp = ii_temp;
        } else if (current_hour < ii_hour && ii != 0) {
          console.log("*** previous_hour :" + previous_hour);
          console.log("*** previous_temp :" + previous_temp);
          console.log("*** current_hour :" + current_hour);
          console.log("*** ii_hour :" + ii_hour);
          console.log("*** ii_temp :" + ii_temp);

          // is the diff from cur to prev 1 or 2?
          var diff = current_hour - previous_hour;

          var diff_temp;

          var temp_is_going_down;

          // if the next temp is less than the previous temp
          // ie, if the temp is going down
          if (ii_temp < previous_temp) {
            diff_temp = previous_temp - ii_temp;
            temp_is_going_down = true;
          } else {
            diff_temp = ii_temp - previous_temp;
            temp_is_going_down = false;
          }
          console.log("*** diff_temp :" + diff_temp);

          var fraction = diff / 3;

          console.log("*** fraction :" + fraction);

          var temp_delta_to_use = diff_temp * fraction;
          console.log("*** temp_delta_to_use :" + temp_delta_to_use);


          console.log("***** math");
          console.log("***** previous_temp: " + previous_temp);
          console.log("***** temp_delta_to_use: " + temp_delta_to_use);
          console.log("***** previous_temp - temp_delta_to_use: " + toString(Number(previous_temp - temp_delta_to_use)));

          var yesterdays_temp_tmp;
          if (temp_is_going_down) {
            yesterdays_temp_tmp = previous_temp - temp_delta_to_use;
          } else {
            yesterdays_temp_tmp = previous_temp + temp_delta_to_use;
          }

          console.log("*** yesterdays_temp_tmp :" + yesterdays_temp_tmp);

          console.log("***** math");

          yesterdays_temp = yesterdays_temp_tmp;

          done = true;
        }

        console.log("ii_hour :" + ii_hour);
        console.log("time :" + Number(pastWeather.data.weather[0].hourly[ii].time));
        console.log("tempF :" + ii_temp);

        previous_hour = ii_hour;
        previous_temp = ii_temp;
      }



      //////////






      console.log("yesterdays_temp: " + yesterdays_temp);

      response_var.jsonp({ yesterdays_temp : yesterdays_temp});





    });
  }

  http.request(options, callback).end();
}