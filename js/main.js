/* global astroData */
/* global weatherData */

var $pageLanding = document.querySelector('#page-landing');
var $pagePlan = document.querySelector('#page-plan');
var $header = document.querySelector('h2');
var $zipInput = document.querySelector('#zip');
var $navPlan = document.querySelector('.nav.plan');

function viewPlan(event) {
  $pagePlan.className = 'container view';
  $pageLanding.className = 'container view hidden';
  $header.className = 'header view';
  $header.textContent = 'Location';
  $navPlan.className = 'nav plan bold';
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
  $astroSunrise.textContent = astroData.sunrise;

  var $astroSolarNoon = document.querySelector('.solar-noon');
  $astroSolarNoon.textContent = astroData.solarNoon;

  var $astroSunset = document.querySelector('.sunset');
  $astroSunset.textContent = astroData.sunset;

  var $astroMoonrise = document.querySelector('.moonrise');
  $astroMoonrise.textContent = astroData.moonrise;

  var $astroMoonset = document.querySelector('.moonset');
  $astroMoonset.textContent = astroData.moonset;

  var $astroDayLength = document.querySelector('.day-length');
  $astroDayLength.textContent = astroData.dayLength;

  var $weatherTemperature = document.querySelector('.temperature');
  $weatherTemperature.textContent = weatherData.temperature;

  var $weatherHumidity = document.querySelector('.humidity');
  $weatherHumidity.textContent = weatherData.humidity;

  var $weatheruvIndex = document.querySelector('.uv-index');
  $weatheruvIndex.textContent = weatherData.uvIndex;

  var $weatherWindDirection = document.querySelector('.wind-direction');
  $weatherWindDirection.textContent = weatherData.windDirection;

  var $weatherFeelsLike = document.querySelector('.feels-like');
  $weatherFeelsLike.textContent = weatherData.feelsLike;

  var $weatherPrecipitation = document.querySelector('.precipitation');
  $weatherPrecipitation.textContent = weatherData.precipitation;

  var $weatherCloudCover = document.querySelector('.cloud-cover');
  $weatherCloudCover.textContent = weatherData.cloudCover;

  var $weatherWindSpeed = document.querySelector('.wind-speed');
  $weatherWindSpeed.textContent = weatherData.windSpeed;
}

function requestData(event) {
  if (event.target.value.length < 5) {
    return;
  }
  astroData.zip = event.target.value;
  weatherData.zip = event.target.value;
  getAstroData(event);
  getWeatherData(event);
  renderData();
}

$zipInput.addEventListener('input', requestData);

$navPlan.addEventListener('click', viewPlan);
window.addEventListener('DOMContentLoaded', renderData);
