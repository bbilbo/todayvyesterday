function getLocation() {
  console.log("function start: getLocation()");

	if (dev_env) {
    localStorage.users_latitude = dev_latitude;
    localStorage.users_longitude = dev_longitude;
  } else if (localStorage.manual_override) {
    getZipCodeName();
  } else {
    getComputerLocation();
  }

  console.log("function end: getLocation()");
}

// get computer's location

function getComputerLocation() {
  console.log("function start: getComputerLocation()");
  div_mini_status.style.display = "";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getComputerLocationCallback);
  } else {
    //p_current_temp.innerHTML="Geolocation is not supported by this browser.";
  }
  console.log("function end: getComputerLocation()");
}

function getComputerLocationCallback(position) {	
  console.log("function start: getComputerLocationCallback()");
  
  users_latitude = position.coords.latitude;
  users_longitude = position.coords.longitude;
  getLatLongName();
  
  if (cache_app_data) {
    localStorage.users_latitude = users_latitude;
    localStorage.users_longitude = users_longitude;
  }

  div_status.innerHTML="Got current location.";
  div_mini_status.style.display = "none";
  
  console.log("function end: getComputerLocationCallback()");
}

function getLatLongName() {
  var state = "";
  var city = "";

  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(users_latitude, users_longitude);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        parseCityState(results);
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
}

function getZipCodeName() {
  console.log("function start: getZipCodeName()");
  geocoder = new google.maps.Geocoder();
  console.log("localStorage.users_zipcode: " + localStorage.users_zipcode);
  var address = localStorage.users_zipcode;
  geocoder.geocode( { 'address': address}, function(results, status) {
    console.log("getZipCodeName Callback");
      if (status == google.maps.GeocoderStatus.OK) {
        console.log("Geocoder status: " + status);
        parseCityState(results);
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  console.log("function end: getZipCodeName()");
}

function parseCityState(results) {
  console.log("function start: parseCityState()");
  if (results[0]) {
    var address_components_length = results[0].address_components.length;

    for(ii = 0; ii < address_components_length; ii++) {
      var types_length = results[0].address_components[ii].types.length;
      for(jj = 0; jj < address_components_length; jj++) {
        if (results[0].address_components[ii].types[jj] == "administrative_area_level_1") {
          console.log("found administrative_area_level_1");
          state = results[0].address_components[ii].short_name;
        }
        if (results[0].address_components[ii].types[jj] == "locality") {
          console.log("found locality");
          city = results[0].address_components[ii].short_name;
        }
      }
    }

    if (city != "" && state != "") {
      location_name = city + ", " + state; 
    } else {
      location_name = users_latitude + ", " + users_longitude;
    }
    console.log("location_name: " + location_name);

    current_location_span.innerHTML = "" + location_name;
    current_location_span.style.display = "";
  }
}