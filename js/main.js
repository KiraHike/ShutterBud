/* global astroData */
/* global weatherData */

var $pageLanding = document.querySelector('#page-landing');
var $pagePlan = document.querySelector('#page-plan');
var $header = document.querySelector('h2');
var $zipInputLanding = document.querySelector('#zip-landing');
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

function renderData() {
  var $astroSunrise = document.querySelector('.sunrise');
  $astroSunrise.textContent = 'Sunrise: ' + astroData.sunrise;

  var $astroSolarNoon = document.querySelector('.solar-noon');
  $astroSolarNoon.textContent = 'Solar Noon: ' + astroData.solarNoon;

  var $astroSunset = document.querySelector('.sunset');
  $astroSunset.textContent = 'Sunset: ' + astroData.sunset;

  var $astroMoonrise = document.querySelector('.moonrise');
  $astroMoonrise.textContent = 'Moonrise: ' + astroData.moonrise;

  var $astroMoonset = document.querySelector('.moonset');
  $astroMoonset.textContent = 'Moonset: ' + astroData.moonset;

  var $astroDayLength = document.querySelector('.day-length');
  $astroDayLength.textContent = 'Day Length: ' + astroData.dayLength;

  var $weatherTemperature = document.querySelector('.temperature');
  $weatherTemperature.textContent = 'Temperature: ' + weatherData.temperature;

  var $weatherHumidity = document.querySelector('.humidity');
  $weatherHumidity.textContent = 'Humidity: ' + weatherData.humidity;

  var $weatheruvIndex = document.querySelector('.uv-index');
  $weatheruvIndex.textContent = 'UV Index: ' + weatherData.uvIndex;

  var $weatherWindDirection = document.querySelector('.wind-direction');
  $weatherWindDirection.textContent = 'Wind Direction: ' + weatherData.windDirection;

  var $weatherFeelsLike = document.querySelector('.feels-like');
  $weatherFeelsLike.textContent = 'Feels Like: ' + weatherData.feelsLike;

  var $weatherPrecipitation = document.querySelector('.precipitation');
  $weatherPrecipitation.textContent = 'Precipitation: ' + weatherData.precipitation;

  var $weatherCloudCover = document.querySelector('.cloud-cover');
  $weatherCloudCover.textContent = 'Cloud Cover: ' + weatherData.cloudCover;

  var $weatherWindSpeed = document.querySelector('.wind-speed');
  $weatherWindSpeed.textContent = 'Wind Speed: ' + weatherData.windSpeed;
}

$navPlan.addEventListener('click', viewPlan);

$zipInputLanding.addEventListener('input', function () {
  if ($zipInputLanding.value.length < 5) {
    return;
  }
  astroData.zip = $zipInputLanding.value;
  weatherData.zip = $zipInputLanding.value;
  getAstroData(event);
  getWeatherData(event);
  renderData();
  viewPlan(event);
});

$zipInputPlan.addEventListener('input', function () {
  if ($zipInputPlan.value.length < 5) {
    return;
  }
  astroData.zip = $zipInputPlan.value;
  weatherData.zip = $zipInputPlan.value;
  getAstroData(event);
  getWeatherData(event);
  renderData();
});

window.addEventListener('DOMContentLoaded', renderData);
