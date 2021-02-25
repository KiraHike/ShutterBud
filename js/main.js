/* global astroData */
/* global weatherData */
/* global fieldNotes */

var $pageLanding = document.querySelector('#page-landing');
var $pagePlan = document.querySelector('#page-plan');
var $pageRecord = document.querySelector('#page-record');
var $pageReview = document.querySelector('#page-review');
var $header = document.querySelector('h2');
var $zipInput = document.querySelector('#zip');
var $form = document.querySelector('#field-notes-form');
var $buttonSave = document.querySelector('#button-save');
var $fieldNotes = document.querySelector('.field-notes');
var $navPlan = document.querySelector('.nav.plan');
var $navRecord = document.querySelector('.nav.record');
var $navReview = document.querySelector('.nav.review');

var fieldNote;

function viewPlan(event) {
  $pagePlan.className = 'container view';
  $pageLanding.className = 'container view hidden';
  $pageRecord.className = 'container view hidden';
  $pageReview.className = 'container view hidden';
  $header.className = 'header view';
  $header.textContent = 'Location';
  $navPlan.className = 'nav plan bold';
  $navRecord.className = 'nav record';
  $navReview.className = 'nav review';
}

function viewRecord(event) {
  $pageRecord.className = 'container view';
  $pageLanding.className = 'container view hidden';
  $pagePlan.className = 'container view hidden';
  $pageReview.className = 'container view hidden';
  $header.className = 'header view';
  $header.textContent = 'New';
  $navRecord.className = 'nav record bold';
  $navPlan.className = 'nav plan';
  $navReview.className = 'nav review';
}

function viewReview(event) {
  $pageReview.className = 'container view';
  $pageLanding.className = 'container view hidden';
  $pagePlan.className = 'container view hidden';
  $pageRecord.className = 'container view hidden';
  $pagePlan.className = 'container view hidden';
  $header.className = 'header view';
  $header.textContent = 'Field Notes';
  $navReview.className = 'nav review bold';
  $navPlan.className = 'nav plan';
  $navRecord.className = 'nav record';
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

function newEditNote(event) {
  event.preventDefault();
  var $photoName = document.querySelector('#photo');
  var $camera = document.querySelector('#camera');
  var $lens = document.querySelector('#lens');
  var $filter = document.querySelector('#filter');
  var $shutterSpeed = document.querySelector('#shutter');
  var $aperture = document.querySelector('#aperture');
  var $iso = document.querySelector('#iso');
  var $whiteBalance = document.querySelector('#whitebal');
  var $notes = document.querySelector('#notes');
  if ($header.textContent === 'New') {
    getAstroData(event);
    fieldNote = {
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
    fieldNotes.notes.unshift(fieldNote);
    var renderedFieldNote = renderNote(fieldNote);
    $fieldNotes.prepend(renderedFieldNote);
    fieldNotes.nextNum++;
  } else {
    for (var i = 0; i < fieldNotes.notes.length; i++) {
      if (fieldNotes.notes[i].noteNum === fieldNotes.edit.noteNum) {
        fieldNotes.edit.photoName = $photoName.value;
        fieldNotes.edit.camera = $camera.value;
        fieldNotes.edit.lens = $lens.value;
        fieldNotes.edit.filter = $filter.value;
        fieldNotes.edit.shutterSpeed = $shutterSpeed.value;
        fieldNotes.edit.aperture = $aperture.value;
        fieldNotes.edit.iso = $iso.value;
        fieldNotes.edit.whiteBalance = $whiteBalance.value;
        fieldNotes.edit.notes = $notes.value;

        fieldNotes.notes.splice(i, 1, fieldNotes.edit);
      }
    }
  }
  fieldNotes.edit = null;
  $form.reset();
  viewReview(event);
}

function renderNote(object) {
  var $li = document.createElement('li');
  $li.setAttribute('id', object.noteNum);

  var $liDiv = document.createElement('div');
  $liDiv.setAttribute('class', 'container-li');
  $li.append($liDiv);

  var $liRow1 = document.createElement('div');
  $liRow1.setAttribute('class', 'row black');
  $liDiv.append($liRow1);

  var $colDate = document.createElement('div');
  $colDate.setAttribute('class', 'column-third');
  var $textDate = document.createTextNode(object.date);
  $colDate.append($textDate);
  $liRow1.append($colDate);

  var $colPhoto = document.createElement('div');
  $colPhoto.setAttribute('class', 'column-third');
  var $textPhoto = document.createTextNode(object.photoName);
  $colPhoto.append($textPhoto);
  $liRow1.append($colPhoto);

  var $colIcons = document.createElement('div');
  $colIcons.setAttribute('class', 'column-third');
  var $Icons = document.createElement('i');
  $Icons.setAttribute('class', 'fas fa-pen-square icon-white');
  $colIcons.append($Icons);
  $liRow1.append($colIcons);

  var $liRow2 = document.createElement('div');
  $liRow2.setAttribute('class', 'row gray');
  $liDiv.append($liRow2);

  var $colCamera = document.createElement('div');
  $colCamera.setAttribute('class', 'column-third');
  var $textCamera = document.createTextNode(object.camera);
  $colCamera.append($textCamera);
  $liRow2.append($colCamera);

  var $colLens = document.createElement('div');
  $colLens.setAttribute('class', 'column-third');
  var $textLens = document.createTextNode(object.lens);
  $colLens.append($textLens);
  $liRow2.append($colLens);

  var $colFilter = document.createElement('div');
  $colFilter.setAttribute('class', 'column-third');
  var $textFilter = document.createTextNode(object.filter);
  $colFilter.append($textFilter);
  $liRow2.append($colFilter);

  var $liRow3 = document.createElement('div');
  $liRow3.setAttribute('class', 'row gray');
  $liDiv.append($liRow3);

  var $colShutterSpeed = document.createElement('div');
  $colShutterSpeed.setAttribute('class', 'column-fourth');
  var $textShutterSpeed = document.createTextNode(object.shutterSpeed);
  $colShutterSpeed.append($textShutterSpeed);
  $liRow3.append($colShutterSpeed);

  var $colAperture = document.createElement('div');
  $colAperture.setAttribute('class', 'column-fourth');
  var $textAperture = document.createTextNode(object.aperture);
  $colAperture.append($textAperture);
  $liRow3.append($colAperture);

  var $colIso = document.createElement('div');
  $colIso.setAttribute('class', 'column-fourth');
  var $textIso = document.createTextNode(object.iso);
  $colIso.append($textIso);
  $liRow3.append($colIso);

  var $colWhiteBalance = document.createElement('div');
  $colWhiteBalance.setAttribute('class', 'column-fourth');
  var $textWhiteBalance = document.createTextNode(object.whiteBalance);
  $colWhiteBalance.append($textWhiteBalance);
  $liRow3.append($colWhiteBalance);

  var $liRow4 = document.createElement('div');
  $liRow4.setAttribute('class', 'row');
  $liDiv.append($liRow4);

  var $colNotes = document.createElement('div');
  $colNotes.setAttribute('class', 'column-full note');
  var $textNotes = document.createTextNode(object.notes);
  $colNotes.append($textNotes);
  $liRow4.append($colNotes);

  return $li;
}

function editDelNote(event) {
  if (event.target.getAttribute('class') === 'fas fa-pen-square icon-white') {
    var closestElement = event.target.closest('li');
    var noteIDNum = Number(closestElement.getAttribute('id'));
    for (var i = 0; i < fieldNotes.notes.length; i++) {
      if (fieldNotes.notes[i].noteNum === noteIDNum) {
        fieldNotes.edit = fieldNotes.notes[i];
        viewRecord(event);
        $header.textContent = 'Edit';
        $form.elements.photo.value = fieldNotes.edit.photoName;
        $form.elements.camera.value = fieldNotes.edit.camera;
        $form.elements.lens.value = fieldNotes.edit.lens;
        $form.elements.filter.value = fieldNotes.edit.filter;
        $form.elements.shutter.value = fieldNotes.edit.shutterSpeed;
        $form.elements.aperture.value = fieldNotes.edit.aperture;
        $form.elements.iso.value = fieldNotes.edit.iso;
        $form.elements.whitebal.value = fieldNotes.edit.whiteBalance;
        $form.elements.notes.value = fieldNotes.edit.notes;
      }
    }
  }
}

function renderFieldNotes(array) {
  for (var i = 0; i < array.length; i++) {
    fieldNote = renderNote(array[i]);
    $fieldNotes.append(fieldNote);
  }
}

$zipInput.addEventListener('input', requestData);
$buttonSave.addEventListener('click', newEditNote);
$fieldNotes.addEventListener('click', editDelNote);

$navPlan.addEventListener('click', viewPlan);
$navRecord.addEventListener('click', viewRecord);
$navReview.addEventListener('click', viewReview);

window.addEventListener('DOMContentLoaded', function () {
  renderData();
  renderFieldNotes(fieldNotes.notes);
});
