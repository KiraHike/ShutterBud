/* global astroData */
/* global weatherData */
/* global fieldNotes */
/* global gearData */

var $pageLanding = document.querySelector('#page-landing');
var $pagePlan = document.querySelector('#page-plan');
var $pageRecord = document.querySelector('#page-record');
var $pageReview = document.querySelector('#page-review');
var $pageGear = document.querySelector('#page-gear');

var $header = document.querySelector('header');
var $headerTitle = document.querySelector('h2');

var $zipInput = document.querySelector('#zip');
var $spinner = document.querySelector('.spinner');

var $form = document.querySelector('#field-notes-form');

var $photoName = document.querySelector('#photo');
var $camera = document.querySelector('#camera');
var $lens = document.querySelector('#lens');
var $filter = document.querySelector('#filter');
var $shutterSpeed = document.querySelector('#shutter');
var $aperture = document.querySelector('#aperture');
var $iso = document.querySelector('#iso');
var $whiteBalance = document.querySelector('#whitebal');
var $notes = document.querySelector('#notes');

var $selectCamera = document.querySelector('#camera');
var $selectLens = document.querySelector('#lens');
var $selectFilter = document.querySelector('#filter');
var $buttonSave = document.querySelector('#button-save');

var $gearCameras = document.querySelector('.gear.cameras');
var $gearLenses = document.querySelector('.gear.lenses');
var $gearFilters = document.querySelector('.gear.filters');
var $newCamera = document.querySelector('#cameras');
var $addCamera = document.querySelector('#addCamera');
var $newLens = document.querySelector('#lenses');
var $addLens = document.querySelector('#addLens');
var $newFilter = document.querySelector('#filters');
var $addFilter = document.querySelector('#addFilter');

var $fieldNotes = document.querySelector('.field-notes');
var $noNotesMsg = document.querySelector('#no-notes-msg');

var $modal = document.querySelector('.modal');
var $modalYes = document.querySelector('.icon-modal-yes');
var $modalNo = document.querySelector('.icon-modal-no');

var $navPlan = document.querySelector('.nav.plan');
var $navRecord = document.querySelector('.nav.record');
var $navReview = document.querySelector('.nav.review');
var $navGear = document.querySelector('.nav.gear');

var fieldNote;
var closestElement;
var noteIDNum;

function viewPlan(event) {
  $pagePlan.className = 'container view';
  $pageLanding.className = 'view hidden';
  $pageRecord.className = 'container view hidden';
  $pageReview.className = 'container view hidden';
  $pageGear.className = 'container view hidden';
  $header.className = 'header view';
  $headerTitle.textContent = 'Location';
  $navPlan.className = 'nav plan bold';
  $navRecord.className = 'nav record';
  $navReview.className = 'nav review';
  $navGear.className = 'nav gear';
}

function viewRecord(event) {
  $pageRecord.className = 'container view';
  $pageLanding.className = 'view hidden';
  $pagePlan.className = 'container view hidden';
  $pageReview.className = 'container view hidden';
  $pageGear.className = 'container view hidden';
  $header.className = 'header view';
  $headerTitle.textContent = 'New';
  $navRecord.className = 'nav record bold';
  $navPlan.className = 'nav plan';
  $navReview.className = 'nav review';
  $navGear.className = 'nav gear';
}

function viewReview(event) {
  $pageReview.className = 'container view';
  $pageLanding.className = 'view hidden';
  $pagePlan.className = 'container view hidden';
  $pageRecord.className = 'container view hidden';
  $pagePlan.className = 'container view hidden';
  $pageGear.className = 'container view hidden';
  $header.className = 'header view';
  $headerTitle.textContent = 'Field Notes';
  $navReview.className = 'nav review bold';
  $navPlan.className = 'nav plan';
  $navRecord.className = 'nav record';
  $navGear.className = 'nav gear';
}

function viewGear(event) {
  $pageGear.className = 'container view';
  $pageLanding.className = 'view hidden';
  $pagePlan.className = 'container view hidden';
  $pageRecord.className = 'container view hidden';
  $pageReview.className = 'container view hidden';
  $header.className = 'header view';
  $headerTitle.textContent = 'My Gear';
  $navGear.className = 'nav gear bold';
  $navPlan.className = 'nav plan';
  $navRecord.className = 'nav record';
  $navReview.className = 'nav review';
}

function getAstroData(event) {
  $spinner.className = 'spinner';
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
    getWeatherData();
  });
  xhr.send();
}

function getWeatherData(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip='
          + weatherData.zip + '&appid=15a78bd9a1947e135af141f028f19302&units=imperial');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    weatherData.temperature = Math.round(xhr.response.main.temp);
    weatherData.humidity = Math.round(xhr.response.main.humidity);
    weatherData.feelsLike = Math.round(xhr.response.main.feels_like);
    weatherData.cloudCover = Math.round(xhr.response.clouds.all);
    renderData();
    $spinner.className = 'spinner hidden';
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

  var $weatherFeelsLike = document.querySelector('.feels-like');
  $weatherFeelsLike.textContent = weatherData.feelsLike;

  var $weatherCloudCover = document.querySelector('.cloud-cover');
  $weatherCloudCover.textContent = weatherData.cloudCover;
}

function requestData(event) {
  if (event.target.value.length < 5) {
    return;
  }
  astroData.zip = event.target.value;
  weatherData.zip = event.target.value;
  getAstroData(event);
  event.target.value = null;
}

function ready(event) {
  for (var i = 0; i < $form.elements.length; i++) {
    if ($form.elements[i].value.length < 1) {
      return;
    }
  }
  $buttonSave.className = 'fas fa-plus-square fa-2x icon-green';
}

function newEditNote(event) {
  event.preventDefault();
  if ($headerTitle.textContent === 'New') {
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
    $noNotesMsg.className = 'view hidden';
    var $optionsArray = document.querySelectorAll('option');
    for (var i = 0; i < $optionsArray.length; i++) {
      if ($optionsArray[i].textContent === $camera.value ||
        $optionsArray[i].textContent === $lens.value ||
        $optionsArray[i].textContent === $filter.value) {
        $optionsArray[i].setAttribute('selected', 'default');
      } else {
        $optionsArray[i].removeAttribute('selected');
      }
    }
  } else {
    for (i = 0; i < fieldNotes.notes.length; i++) {
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
        var editedNote = renderNote(fieldNotes.edit);
        closestElement.replaceWith(editedNote);
      }
    }
  }
  fieldNotes.edit = null;
  $form.reset();
  $buttonSave.className = 'fas fa-plus-square fa-2x';
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
  $colPhoto.setAttribute('class', 'column-third center');
  var $textPhoto = document.createTextNode(object.photoName);
  $colPhoto.append($textPhoto);
  $liRow1.append($colPhoto);

  var $colIcons = document.createElement('div');
  $colIcons.setAttribute('class', 'column-third right');
  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fas fa-pen-square icon-white edit-n');
  $colIcons.append($editIcon);
  var $deleteIcon = document.createElement('i');
  $deleteIcon.setAttribute('class', 'fas fa-minus-square icon-white del-n');
  $colIcons.append($deleteIcon);
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
  closestElement = event.target.closest('li');
  noteIDNum = Number(closestElement.getAttribute('id'));
  for (var i = 0; i < fieldNotes.notes.length; i++) {
    if (fieldNotes.notes[i].noteNum === noteIDNum) {
      if (event.target.getAttribute('class') === 'fas fa-pen-square icon-white edit-n') {
        fieldNotes.edit = fieldNotes.notes[i];
        viewRecord(event);
        $headerTitle.textContent = 'Edit';
        $form.elements.photo.value = fieldNotes.edit.photoName;
        $form.elements.camera.value = fieldNotes.edit.camera;
        $form.elements.lens.value = fieldNotes.edit.lens;
        $form.elements.filter.value = fieldNotes.edit.filter;
        $form.elements.shutter.value = fieldNotes.edit.shutterSpeed;
        $form.elements.aperture.value = fieldNotes.edit.aperture;
        $form.elements.iso.value = fieldNotes.edit.iso;
        $form.elements.whitebal.value = fieldNotes.edit.whiteBalance;
        $form.elements.notes.value = fieldNotes.edit.notes;
        $buttonSave.className = 'fas fa-plus-square fa-2x icon-green';
      } else if (event.target.getAttribute('class') === 'fas fa-minus-square icon-white del-n') {
        $modal.className = 'modal view';
        event.target.className = 'fas fa-minus-square icon-red del-n';
      }
    }
  }
}

function closeModal(event) {
  var $redIcon;
  if ($pageReview.getAttribute('class') === 'container view') {
    $modal.className = 'modal view hidden';
    $redIcon = document.querySelector('.icon-red.del-n');
    $redIcon.className = 'fas fa-minus-square icon-white del-n';
  } else {
    $modal.className = 'modal view hidden';
    $redIcon = document.querySelector('.icon-red.del-g');
    $redIcon.className = 'fas fa-minus-square del-g';
  }
}

function deleteNoteGear(event) {
  if ($pageReview.getAttribute('class') === 'container view') {
    for (var i = 0; i < fieldNotes.notes.length; i++) {
      if (fieldNotes.notes[i].noteNum === noteIDNum) {
        fieldNotes.notes.splice(i, 1);
      }
    }
    var $fieldNotesChildren = $fieldNotes.childNodes;
    for (i = 0; i < $fieldNotesChildren.length; i++) {
      if ($fieldNotesChildren[i] === closestElement) {
        $fieldNotesChildren[i].remove();
      }
    }
    if (fieldNotes.notes.length === 0) {
      $noNotesMsg.className = 'view';
    }
  } else {
    if (closestElement.getAttribute('data-gear') === 'camera') {
      for (i = 0; i < gearData.cameras.length; i++) {
        if (gearData.cameras[i] === closestElement.textContent) {
          gearData.cameras.splice(i, 1);
        }
      }
      var $gearCamerasChildren = $gearCameras.childNodes;
      var $selectCameraChildren = $selectCamera.childNodes;
      for (i = 0; i < $gearCamerasChildren.length; i++) {
        if ($gearCamerasChildren[i] === closestElement) {
          $gearCamerasChildren[i].remove();
          $selectCameraChildren[i + 3].remove();
        }
      }
    } else if (closestElement.getAttribute('data-gear') === 'lens') {
      for (i = 0; i < gearData.lenses.length; i++) {
        if (gearData.lenses[i] === closestElement.textContent) {
          gearData.lenses.splice(i, 1);
        }
      }
      var $gearLensesChildren = $gearLenses.childNodes;
      var $selectLensChildren = $selectLens.childNodes;
      for (i = 0; i < $gearLensesChildren.length; i++) {
        if ($gearLensesChildren[i] === closestElement) {
          $gearLensesChildren[i].remove();
          $selectLensChildren[i + 3].remove();
        }
      }
    } else {
      for (i = 0; i < gearData.filters.length; i++) {
        if (gearData.filters[i] === closestElement.textContent) {
          gearData.filters.splice(i, 1);
        }
      }
      var $gearFiltersChildren = $gearFilters.childNodes;
      var $selectFilterChildren = $selectFilter.childNodes;
      for (i = 0; i < $gearFiltersChildren.length; i++) {
        if ($gearFiltersChildren[i] === closestElement) {
          $gearFiltersChildren[i].remove();
          $selectFilterChildren[i + 3].remove();
        }
      }
    }
  }
  $modal.className = 'modal view hidden';
}

function renderFieldNotes(array) {
  if (array.length === 0) {
    $noNotesMsg.className = 'view';
  } else {
    for (var i = 0; i < array.length; i++) {
      fieldNote = renderNote(array[i]);
      $fieldNotes.append(fieldNote);
    }
  }
}

function newGear(event) {
  event.preventDefault();
  var renderedGear;
  var renderedOption;
    if (event.target === $addCamera) {
      gearData.cameras.push($newCamera.value);
      renderedGear = renderGearItem($newCamera.value, 'camera');
      $gearCameras.append(renderedGear);
      renderedOption = renderGearOption($newCamera.value, 'camera');
      $selectCamera.append(renderedOption);
      $newCamera.value = null;
  } else if (event.target === $addLens) {
      gearData.lenses.push($newLens.value);
      renderedGear = renderGearItem($newLens.value, 'lens');
      $gearLenses.append(renderedGear);
      renderedOption = renderGearOption($newLens.value, 'lens');
      $selectLens.append(renderedOption);
      $newLens.value = null;
  } else if (event.target === $addFilter) {
      gearData.filters.push($newFilter.value);
      renderedGear = renderGearItem($newFilter.value, 'filter');
      $gearFilters.append(renderedGear);
      renderedOption = renderGearOption($newFilter.value, 'filter');
      $selectFilter.append(renderedOption);
      $newFilter.value = null;
  }
}

function deleteGearItem(event) {
  if (event.target.matches('i')) {
    $modal.className = 'modal view';
    event.target.className = 'fas fa-minus-square icon-red del-g';
    closestElement = event.target.closest('li');
  }
}

function renderGearItem(item, gearType) {
  var $gearItem = document.createElement('li');
  $gearItem.setAttribute('class', 'gear-item');
  $gearItem.setAttribute('data-gear', gearType);
  $gearItem.textContent = item;
  var $deleteGearIcon = document.createElement('i');
  $deleteGearIcon.setAttribute('class', 'fas fa-minus-square del-g');
  $gearItem.prepend($deleteGearIcon);
  return $gearItem;
}

function renderGearOption(item, gearType) {
  var $gearOption = document.createElement('option');
  $gearOption.setAttribute('data-gear', gearType);
  $gearOption.textContent = item;
  return $gearOption;
}

function renderGear(object) {
  var gear;
  var option;
  for (var i = 0; i < object.cameras.length; i++) {
    gear = renderGearItem(object.cameras[i], 'camera');
    $gearCameras.append(gear);
    option = renderGearOption(object.cameras[i], 'camera');
    $selectCamera.append(option);
  }
  for (i = 0; i < object.lenses.length; i++) {
    gear = renderGearItem(object.lenses[i], 'lens');
    $gearLenses.append(gear);
    option = renderGearOption(object.lenses[i], 'lens');
    $selectLens.append(option);
  }
  for (i = 0; i < object.filters.length; i++) {
    gear = renderGearItem(object.filters[i], 'filter');
    $gearFilters.append(gear);
    option = renderGearOption(object.filters[i], 'filter');
    $selectFilter.append(option);
  }
}

$zipInput.addEventListener('input', requestData);

$form.addEventListener('keypress', ready);
$buttonSave.addEventListener('click', newEditNote);

$fieldNotes.addEventListener('click', editDelNote);
$modalNo.addEventListener('click', closeModal);
$modalYes.addEventListener('click', deleteNoteGear);

$gearCameras.addEventListener('click', deleteGearItem);
$gearLenses.addEventListener('click', deleteGearItem);
$gearFilters.addEventListener('click', deleteGearItem);
$addCamera.addEventListener('click', newGear);
$addLens.addEventListener('click', newGear);
$addFilter.addEventListener('click', newGear);

$navPlan.addEventListener('click', viewPlan);
$navRecord.addEventListener('click', viewRecord);
$navReview.addEventListener('click', viewReview);
$navGear.addEventListener('click', viewGear);

window.addEventListener('DOMContentLoaded', function () {
  renderData();
  renderFieldNotes(fieldNotes.notes);
  renderGear(gearData);
});
