// weather.js




// get the current weather

function getCurrentWeather() {
  console.log("function start: getCurrentWeather()");
  
	var query_str = users_latitude + "," + users_longitude;
	
	if (localStorage.manual_override) {
		query_str = String(localStorage.users_zipcode);
	}

  if (brian_is_cool) {
    console.log("dev_env");
    my_server_get_local_weather(query_str);
    //wwoGetLocalWeather(query_str);
  } else {
    //wuGeoLoopupConditions(query_str);
    wwoGetLocalWeather(query_str);
  }
  
  console.log("function end: getCurrentWeather()");
}

function CurrentWeatherCallback() {
  div_status.innerHTML="";
  current_location_div.style.visibility = "visible";
  p_current_temp.innerHTML = "Current temp: " + todays_temp + "°";
}

function my_server_get_local_weather(query_str) {
  var server_domain;

  if (document.location.hostname == "localhost") {
    console.log("IM ON LOCALHOST!!!!");
    server_domain = "localhost:5000";
  } else {
    server_domain = "www.todayvyesterday.com"
  }

  var wunderground_url = "http://" + server_domain + "/weather/" + query_str;
  
  console.log("asking " + server_domain + " question: " + wunderground_url);
  
  jQuery(document).ready(function($) {
    $.ajax({
      url : wunderground_url,
      dataType : "jsonp",
      success : function(parsed_json) {
        //location_name = parsed_json['location']['city'];
        console.log(server_domain + " responded with: ");
        console.log(parsed_json);
        todays_temp = parsed_json['todays_temp'];

        CurrentWeatherCallback();
      }
    });
  });
}

function wuGeoLoopupConditions(query_str) {
  var wunderground_url = "http://api.wunderground.com/api/31d46c83b443d545/geolookup/conditions/q/" + query_str + ".json";
  
  console.log("asking wunderground question: " + wunderground_url);
  
  jQuery(document).ready(function($) {
    $.ajax({
      url : wunderground_url,
      dataType : "jsonp",
      success : function(parsed_json) {
        //location_name = parsed_json['location']['city'];
        todays_temp = parsed_json['current_observation']['temp_f'];

        CurrentWeatherCallback();
      }
    });
  });
}

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

function wwoLocalWeatherCallback(localWeather) {

    output = "<br/> Cloud Cover: " + localWeather.data.current_condition[0].cloudcover;
    output += "<br/> Humidity: " + localWeather.data.current_condition[0].humidity;
    output += "<br/> Temp C: " + localWeather.data.current_condition[0].temp_F;
    output += "<br/> Visibility: " + localWeather.data.current_condition[0].weatherDesc[0].value;
    output += "<br/> Observation Time: " + localWeather.data.current_condition[0].observation_time;
    output += "<br/> Pressue: " + localWeather.data.current_condition[0].pressure;

    todays_temp = localWeather.data.current_condition[0].temp_F;

    CurrentWeatherCallback();
}









//  get yesterday's weather

function getYesterdayWeather() {
  console.log("function: getYesterdayWeather()");
	
	var query_str = users_latitude + "," + users_longitude;
	
	if (localStorage.manual_override) {
		query_str = String(localStorage.users_zipcode);
	}

  wuYesterday(query_str);
  //wwoGetPastWeather(query_str);

  console.log("function end: getYesterdayWeather()");
}

function YesterdayWeatherCallback () {
  p_yesterday_temp.innerHTML = "Yesterday's temp: " + yesterdays_temp + "°";
}

function wuYesterday(query_str) {
  var wunderground_url = "http://api.wunderground.com/api/31d46c83b443d545/yesterday/q/" + query_str + ".json";
  
  console.log("asking wunderground question: " + wunderground_url);
  
  jQuery(document).ready(function($) {
    $.ajax({
      url : wunderground_url,
      dataType : "jsonp",
      success : function(parsed_json) {
        var observations = parsed_json['history']['observations'];

        var observations_length = observations.length;

        var current_date = new Date();
        var current_hour = current_date.getHours();

        for(ii = 0; ii < observations_length; ii++) {

          var observation_hour = observations[ii]['date']['hour'];
          if (observation_hour == current_hour) {
            console.log("found hour");
            yesterdays_temp = observations[ii]['tempi'];
          }

          YesterdayWeatherCallback();
        }
      }
    });
  });
}


function wwoGetPastWeather(query_str) {

  var pastWeatherInput = {
      query: query_str,
      format: 'JSON',
      enddate: '2014-02-01',
      date: '2014-02-01',
      extra: '',
      includelocation: '',
      show_comments: '',
      callback: 'wwoPastWeatherCallback'
  };

  JSONP_PastWeather(pastWeatherInput);
}

function wwoPastWeatherCallback(pastWeather) {

  output = "<br/> Date: " + pastWeather.data.weather[0].date;
  output += "<br/> Max Temp(C): " + pastWeather.data.weather[0].maxtempC;
  output += "<br/> Max Temp(F): " + pastWeather.data.weather[0].maxtempF;
  output += "<br/> Min Temp(C): " + pastWeather.data.weather[0].mintempC;
  output += "<br/> Min Temp(F): " + pastWeather.data.weather[0].mintempF;
  output += "<br/> Cloud Cover: " + pastWeather.data.weather[0].hourly[0].cloudcover;

  var hourlys = pastWeather.data.weather[0].hourly.length;
  
  console.log("hourlys :" + hourlys);
  
  var current_date = new Date();
  var current_hour = current_date.getHours();

  console.log("current_hour :" + current_hour);

  var done = false;

  var previous_hour;
  var previous_temp;

  for(ii = 0; ii < hourlys && !done; ii++) {
    var ii_hour = pastWeather.data.weather[0].hourly[ii].time / 100;
    var ii_temp = pastWeather.data.weather[0].hourly[ii].tempF;

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

      var yesterdays_temp_tmp;
      if (temp_is_going_down) {
        yesterdays_temp_tmp = previous_temp - temp_delta_to_use;
      } else {
        yesterdays_temp_tmp = previous_temp + temp_delta_to_use;
      }

      console.log("*** yesterdays_temp_tmp :" + yesterdays_temp_tmp);
      yesterdays_temp = yesterdays_temp_tmp;

      done = true;
    }

    console.log("ii_hour :" + ii_hour);
    console.log("time :" + pastWeather.data.weather[0].hourly[ii].time);
    console.log("tempF :" + ii_temp);

    previous_hour = ii_hour;
    previous_temp = ii_temp;
  }

  YesterdayWeatherCallback();
}





// take temperatures and subtract

function getWeather() {
  console.log("function start: getWeather()");
  
  var diff_description;
  var diff_amount;
  var help_text = "";

  console.log("todays_temp: " + todays_temp);
  console.log("yesterdays_temp: " + yesterdays_temp);

  if (todays_temp > yesterdays_temp) {
    diff_description = "warmer";
    diff_amount = todays_temp - yesterdays_temp;

    if (diff_amount > 4) {
      help_text = "looks like it is warmer today. maybe you could dress a bit lighter"
    }

  } else {
    diff_description = "cooler";
    diff_amount = yesterdays_temp - todays_temp;

    if (diff_amount > 4) {
      help_text = "looks like it is cooler today. maybe you should dress a bit heavier"
    }

  }

  diff_amount = Math.round(diff_amount * 100) / 100;

  var display_text = "It's " + diff_amount + "° " + diff_description + " than yesterday.";
  if (brian_is_cool) {
    //var display_text = "Brian loves Rachel!";
  }

  p_diff_temp.innerHTML = display_text;
  div_status.innerHTML="";

  div_help.innerHTML = help_text;

  console.log("function end: getWeather()");
}