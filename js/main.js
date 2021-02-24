/* global astroData */
/* global weatherData */

var $pageLanding = document.querySelector('#page-landing');
var $pagePlan = document.querySelector('#page-plan');
var $header = document.querySelector('h2');
var $zipInputPlan = document.querySelector('#zip-plan');
var $navPlan = document.querySelector('.nav.plan');

function viewPlan(event) {
  $pagePlan.className = 'container view';
  $pageLanding.className = 'container view hidden';
  $header.className = 'header view';
  $header.textContent = 'Location';
}

function getAstroData(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.ipgeolocation.io/astronomy?apiKey=e79aa15752144199b62b2a82488d2761&location=' +
    astroData.zip);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    astroData.sunrise = xhr.response.sunrise;
    var $astroSunrise = document.querySelector('.sunrise');
    $astroSunrise.textContent = 'Sunrise: ' + xhr.response.sunrise;
    astroData.solarNoon = xhr.response.solar_noon;
    var $astroSolarNoon = document.querySelector('.solar-noon');
    $astroSolarNoon.textContent = 'Solar Noon: ' + xhr.response.solar_noon;
    astroData.sunset = xhr.response.sunset;
    var $astroSunset = document.querySelector('.sunset');
    $astroSunset.textContent = 'Sunset: ' + xhr.response.sunset;
    astroData.moonrise = xhr.response.moonrise;
    var $astroMoonrise = document.querySelector('.moonrise');
    $astroMoonrise.textContent = 'Moonrise: ' + xhr.response.moonrise;
    astroData.moonset = xhr.response.moonset;
    var $astroMoonset = document.querySelector('.moonset');
    $astroMoonset.textContent = 'Moonset: ' + xhr.response.moonset;
    astroData.dayLength = xhr.response.day_length;
    var $astroDayLength = document.querySelector('.day-length');
    $astroDayLength.textContent = 'Day Length: ' + xhr.response.day_length;
  });
  xhr.send();
}

function getWeatherData(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.weatherstack.com/current?access_key=dcb9c9ee82f6655c925b30ce5386c0d2&query=' +
    weatherData.zip);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    weatherData.temperature = xhr.response.current.temperature;
    weatherData.humidity = xhr.response.current.humidity;
    weatherData.uvIndex = xhr.response.current.uv_index;
    weatherData.windDirection = xhr.response.current.wind_dir;
    weatherData.feelsLike = xhr.response.current.feelslike;
    weatherData.precipitation = xhr.response.current.precip;
    weatherData.cloudCover = xhr.response.current.cloudcover;
    weatherData.windSpeed = xhr.response.current.wind_speed;
  });
  xhr.send();
}

$navPlan.addEventListener('click', viewPlan);

$zipInputPlan.addEventListener('input', function () {
  if ($zipInputPlan.value.length < 5) {
    return;
  }
  astroData.zip = $zipInputPlan.value;
  weatherData.zip = $zipInputPlan.value;
  getAstroData(event);
  getWeatherData(event);
});
