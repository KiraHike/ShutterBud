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
    astroData.solarNoon = xhr.response.solar_noon;
    astroData.sunset = xhr.response.sunset;
    astroData.moonrise = xhr.response.moonrise;
    astroData.moonset = xhr.response.moonset;
    astroData.dayLength = xhr.response.day_length;
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
