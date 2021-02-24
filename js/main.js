/* global astroData */
/* global weatherData */
/* global fieldNotes */

var $pageLanding = document.querySelector('#page-landing');
var $pagePlan = document.querySelector('#page-plan');
var $pageRecord = document.querySelector('#page-record');
var $header = document.querySelector('h2');
var $zipInput = document.querySelector('#zip');
var $form = document.querySelector('#field-notes-form');
var $buttonSave = document.querySelector('#button-save');
var $navPlan = document.querySelector('.nav.plan');
var $navRecord = document.querySelector('.nav.record');

function viewPlan(event) {
  $pagePlan.className = 'container view';
  $pageLanding.className = 'container view hidden';
  $pageRecord.className = 'container view hidden';
  $header.className = 'header view';
  $header.textContent = 'Location';
  $navPlan.className = 'nav plan bold';
  $navRecord.className = 'nav record';
}

function viewRecord(event) {
  $pageRecord.className = 'container view';
  $pageLanding.className = 'container view hidden';
  $pagePlan.className = 'container view hidden';
  $header.className = 'header view';
  $header.textContent = 'New';
  $navRecord.className = 'nav record bold';
  $navPlan.className = 'nav plan';
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
    astroData.date = xhr.response.date;
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

function newNote(event) {
  event.preventDefault();
  getAstroData(event);
  var $photoName = document.querySelector('#photo-name');
  var $camera = document.querySelector('#camera');
  var $lens = document.querySelector('#lens');
  var $filter = document.querySelector('#filter');
  var $shutterSpeed = document.querySelector('#shutter-speed');
  var $aperture = document.querySelector('#aperture');
  var $iso = document.querySelector('#iso');
  var $whiteBalance = document.querySelector('#white-balance');
  var $notes = document.querySelector('#notes');
  var $fieldNote = {
    noteNum: fieldNotes.nextNum,
    date: astroData.date,
    photoName: $photoName.value,
    camera: $camera.value,
    lens: $lens.value,
    filter: $filter.value,
    shutterSpeed: $shutterSpeed.value,
    aperture: $aperture.value,
    iso: $iso.value,
    whiteBalance: $whiteBalance.value,
    notes: $notes.value
  };
  fieldNotes.notes.unshift($fieldNote);
  fieldNotes.nextNum++;
  $form.reset();
}

$zipInput.addEventListener('input', requestData);
$buttonSave.addEventListener('click', newNote);

$navPlan.addEventListener('click', viewPlan);
$navRecord.addEventListener('click', viewRecord);

window.addEventListener('DOMContentLoaded', renderData);
