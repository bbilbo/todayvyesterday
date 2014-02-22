var cache_users_lat_lng = false;

var users_latitude;
var users_longitude;

// 40.7684912,-73.9564793
var dev_latitude = 40.7684912;
var dev_longitude = -73.9564793;

var location_name;

var todays_temp;
var yesterdays_temp;

var info1 = document.getElementById("info1");

var current_location_div = document.getElementById("current_location_div");
var current_location_span = document.getElementById("current_location_span");

var new_location_span = document.getElementById("new_location_span");
var zipcode_input = document.getElementById("zipcode_input");
var compute2 = document.getElementById("compute2");

var go2_error = document.getElementById("go2_error");

var p_current_temp = document.getElementById("current_temp");
var p_yesterday_temp = document.getElementById("yesterday_temp");
var p_diff_temp = document.getElementById("diff_temp");

var div_status = document.getElementById("status");
var div_mini_status = document.getElementById("mini_status");

var init_message = document.getElementById("init_message");
var div_help = document.getElementById("help");

var enter_it_manually_span = document.getElementById("enter_it_manually_span");

var new_location_span2 = document.getElementById("new_location_span2");
var zipcode_input2 = document.getElementById("zipcode_input2");





// button on clicks

// main main fuctoin to get the weather and 

function getWeatherButton() {
  console.log("function start: getWeatherButton()");

  // fire the floodlight
  var axel = Math.random() + "";
  var a = axel * 10000000000000;
  var imgElement = document.createElement('img');
  
  imgElement.style.width= '1px';
  imgElement.style.height= '1px';
  imgElement.src = "http://ad.doubleclick.net/activity;src=3853485;type=cloud150;cat=cloud762;ord=" + a + "?";
  
  document.body.appendChild(imgElement);

  if(!localStorage.user_id) {
    localStorage.user_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });;
    document.cookie = "user_id=" + localStorage.user_id;
  }
  console.log("localStorage.user_id: " + localStorage.user_id);

  init_message.style.display = "none";
  div_status.innerHTML="Getting current location.";

  getLocation();

  var count = 0;

  async.whilst(
      function () {
        console.log("waited " + count + " seconds for location");
        
        if (localStorage.manual_override) {
          return false;
        } else {
          var test1 = users_latitude == null;
          var test2 = users_longitude == null;
          return test1 || test2;
        }
      },
      function (callback) {
          count++;
          console.log("waiting for location (" + users_latitude + ", " + users_longitude + ")");
          setTimeout(callback, 1000);
      },
      function (err) {
          getWeatherButtonCallback();
      }
  );
}




function getWeatherButtonCallback() {
  console.log("function start: getWeatherButtonCallback()");

  div_status.innerHTML="Getting yesterday's weather.";

  async.series([
      getCurrentWeather(),
      getYesterdayWeather()
  ]);

  var count = 0;

  async.whilst(
      function () {
        var time_to_wait = 5;
        if (count == time_to_wait) {
          console.log("waited " + time_to_wait + " seconds for temperatures (" + todays_temp + ", " + yesterdays_temp + ")");
          return false;
        } else {
          var test1 = todays_temp == null;
          var test2 = yesterdays_temp == null;
          return test1 || test2;
        }
      },
      function (callback) {
          count++;
          console.log("waiting for temperatures (" + todays_temp + ", " + yesterdays_temp + ")");
          setTimeout(callback, 1000);
      },
      function (err) {
          var test1 = todays_temp == null;
          var test2 = yesterdays_temp == null;



          var error_occurred = isNaN(todays_temp) || isNaN(yesterdays_temp);
          //error_occurred = true;

          if (error_occurred) {
            // hide the location
            //current_location_div.style.display = "none";

            // hide the current temp
            if (isNaN(todays_temp)) {
              p_current_temp.style.display = "none";
            }

            // hide yesterday's temp
            p_yesterday_temp.style.display = "none";

            // give error message
            p_diff_temp.innerHTML = "</br>I'm sorry, but an error occurred.</br>Please try again later by clicking refresh.</br></br>A log of this error has been made and our engineers have been notified.";

            // let the user know
            console.log("error_occurred: " + error_occurred);
            
            // send an email for further investigation
            // make call to server to send email
            tell_server_to_record_error();
          } else {
            getWeather();
          }
      }
  );

  console.log("function end: getWeatherButtonCallback()");
}


// manual zip code go

function new_zipcode_go() {
	console.log("function start: new_zipcode_go()");

	if (isValidUSZip(zipcode_input.value)) {
	  new_location_span.style.display = "none";
    compute2.style.visibility = "hidden";
	
		go2_error.innerHTML = "";
		
		localStorage.users_zipcode = zipcode_input.value;
		
		localStorage.manual_override = true;
		todays_temp = null;
		yesterdays_temp = null;
		
		p_current_temp.innerHTML = "";
		p_yesterday_temp.innerHTML = "";
		p_diff_temp.innerHTML = "";
		div_help.innerHTML = "";
		
		zipcode_input.style.visibility = "hidden";
		current_location_div.style.visibility = "hidden";
		
		getWeatherButton();
	} else {
		go2_error.innerHTML = "Please enter a valid 5 digit zip code.";
	}
}

function new_zipcode_go2() {
	console.log("function start: new_zipcode_go2()");

	if (isValidUSZip(zipcode_input2.value)) {
	  compute3.style.visibility = "hidden";
	
		go3_error.innerHTML = "";
		
		localStorage.users_zipcode = zipcode_input2.value;
		
		div_mini_status.style.display = "none";
		
		localStorage.manual_override = true;
		//todays_temp = null;
		//yesterdays_temp = null;
		
		//p_current_temp.innerHTML = "";
		//p_yesterday_temp.innerHTML = "";
		//p_diff_temp.innerHTML = "";
		//div_help.innerHTML = "";
		
		//zipcode_input.style.visibility = "hidden";
		//current_location_div.style.visibility = "hidden";
		
		getWeatherButton();
	} else {
		go3_error.innerHTML = "Please enter a valid 5 digit zip code.";
	}
}





// link on clicks

function location_clicked() {
  console.log("function start: location_clicked()");
	current_location_span.style.display = "none";
	new_location_span.style.display = "";
	
	zipcode_input.style.visibility = "visible";
	compute2.style.visibility = "visible";
}
function zipcode_focus() {
	zipcode_input.value = "";
}

function location_clicked2() {
  console.log("function start: location_clicked2()");
	enter_it_manually_span.style.display = "none";
	new_location_span2.style.visibility = "visible";
	
	zipcode_input2.style.visibility = "visible";
	compute3.style.visibility = "visible";
}
function zipcode_focus2() {
	zipcode_input2.value = "";
}



function tell_server_to_record_error() {
  var server_domain;

  if (document.location.hostname == "localhost") {
    console.log("IM ON LOCALHOST!!!!");
    server_domain = "localhost:5000";
  } else {
    server_domain = "www.todayvyesterday.com"
  }

  var request_url = "http://" + server_domain + "/error_occurred/";
  
  console.log("asking " + server_domain + " question: " + request_url);
  
  jQuery(document).ready(function($) {
    $.ajax({
      url : request_url,
      dataType : "jsonp",
      success : function(parsed_json) {
        console.log("email notice sent");
      }
    });
  });
}