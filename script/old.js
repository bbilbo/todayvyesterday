
function getLocationButton() {
  getLocation();
}


function getCurrentWeatherButton() {
  console.log("function start: getCurrentWeatherButton()");

  async.series([
      getLocation(),
      getCurrentWeather()
  ]);

  console.log("function end: getCurrentWeatherButton()");
}


function getYesterdayWeatherButton() {
  console.log("function start: getYesterdayWeatherButton()");

  async.series([
      getLocation(),
      getYesterdayWeather()
  ]);

  console.log("function end: getYesterdayWeatherButton()");
}