/* global astroData */
/* global weatherData */
/* global fieldNotes */
/* global gearData */

var $navBar = document.querySelector('.nav-bar');
var $dataViewList = document.querySelectorAll('[data-view]');
var $pageReview = document.querySelector('#review');
var $headerMain = document.querySelector('header');
var $headerSubRecord = document.querySelector('.headerSub.record');

var $zipInput = document.querySelector('#zip');
var $zipData = document.querySelector('.data-zip');
var $zipForm = document.querySelector('#zip-form');
var $spinner = document.querySelector('.spinner');
var $errorMsg = document.querySelector('.error');

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

var $gearCameras = document.querySelector('.gear.cameras');
var $gearLenses = document.querySelector('.gear.lenses');
var $gearFilters = document.querySelector('.gear.filters');
var $newCameraForm = document.querySelector('#new-camera-form');
var $newLensForm = document.querySelector('#new-lens-form');
var $newFilterForm = document.querySelector('#new-filter-form');

var $fieldNotes = document.querySelector('.field-notes');
var $noNotesMsg = document.querySelector('#no-notes-msg');

var $modal = document.querySelector('.modal');
var $modalYes = document.querySelector('.icon.modal-yes');
var $modalNo = document.querySelector('.icon.modal-no');

var closestElement;
var noteIDNum;


function pageViewSwap(event) {
  $headerMain.className = 'view';
  var page = event.target.getAttribute('data-view');
  for (var i = 0; i < $dataViewList.length; i++) {
    if ($dataViewList[i].getAttribute('data-view') === page) {
      if ($dataViewList[i].className === 'nav') {
        $dataViewList[i].className = 'nav bold';
      } else if ($dataViewList[i].className === 'view hidden') {
        $dataViewList[i].className = 'view';
      }
    } else {
      if ($dataViewList[i].className === 'nav bold') {
        $dataViewList[i].className = 'nav';
      } else if ($dataViewList[i].className === 'view') {
        $dataViewList[i].className = 'view hidden';
      }
    }
  }
}

function getAstronomyData() {
  $errorMsg.className = 'error view hidden';
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
  xhr.addEventListener('error', function () {
    $errorMsg.className = 'error view';
    $spinner.className = 'spinner hidden';
  });
  xhr.send();
}

function getWeatherData() {
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
  event.preventDefault();
  astroData.zip = $zipInput.value;
  weatherData.zip = $zipInput.value;
  $zipData.textContent = $zipInput.value;
  getAstronomyData();
  $zipInput.value = null;
}

function newEditNote(event) {
  event.preventDefault();
  if ($headerSubRecord.textContent === 'New Field Note') {
    getAstronomyData();
    var fieldNote = {
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
    $noNotesMsg.className = 'no-notes hidden';
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
  $headerSubRecord.textContent = 'New Field Note';
  pageViewSwap(event);
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
  $editIcon.setAttribute('class', 'fas fa-pen-square icon-white icon edit-note');
  $editIcon.setAttribute('data-view', 'record');
  $editIcon.setAttribute('id', 'button-edit');
  $colIcons.append($editIcon);
  var $deleteIcon = document.createElement('i');
  $deleteIcon.setAttribute('class', 'fas fa-minus-square icon-white icon delete-note');
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

function editDeleteNote(event) {
  closestElement = event.target.closest('li');
  noteIDNum = Number(closestElement.getAttribute('id'));
  for (var i = 0; i < fieldNotes.notes.length; i++) {
    if (fieldNotes.notes[i].noteNum === noteIDNum) {
      if (event.target.getAttribute('class') === 'fas fa-pen-square icon-white icon edit-note') {
        fieldNotes.edit = fieldNotes.notes[i];
        pageViewSwap(event);
        $headerSubRecord.textContent = 'Edit Field Note';
        $form.elements.photo.value = fieldNotes.edit.photoName;
        $form.elements.camera.value = fieldNotes.edit.camera;
        $form.elements.lens.value = fieldNotes.edit.lens;
        $form.elements.filter.value = fieldNotes.edit.filter;
        $form.elements.shutter.value = fieldNotes.edit.shutterSpeed;
        $form.elements.aperture.value = fieldNotes.edit.aperture;
        $form.elements.iso.value = fieldNotes.edit.iso;
        $form.elements.whitebal.value = fieldNotes.edit.whiteBalance;
        $form.elements.notes.value = fieldNotes.edit.notes;
      } else if (event.target.getAttribute('class') === 'fas fa-minus-square icon-white icon delete-note') {
        $modal.className = 'modal view';
        event.target.className = 'fas fa-minus-square icon-red icon delete-note';
      }
    }
  }
}

function closeModal(event) {
  var $redIcon;
  if ($pageReview.className === 'view') {
    $modal.className = 'modal view hidden';
    $redIcon = document.querySelector('.icon-red.icon.delete-note');
    $redIcon.className = 'fas fa-minus-square icon-white icon delete-note';
  } else {
    $modal.className = 'modal view hidden';
    $redIcon = document.querySelector('.icon-red.icon.delete-gear');
    $redIcon.className = 'fas fa-minus-square icon delete-gear';
  }
}

function deleteNote() {
  if ($pageReview.className !== 'view') {
    return;
  }
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
    $noNotesMsg.className = 'no-notes';
  }
  $modal.className = 'modal view hidden';
}

function deleteGear() {
  if ($pageReview.className === 'view') {
    return;
  }
  var deleteGearType = closestElement.getAttribute('data-gear');
  var $gearChildren = document.querySelector('.gear.' + deleteGearType).childNodes;
  var $selectChildren = document.querySelector('select[data-gear=' + deleteGearType + ']').childNodes;
  for (key in gearData) {
    if (key === deleteGearType) {
      for (var i = 0; i < gearData[key].length; i++) {
        if (gearData[key][i] === closestElement.textContent) {
          gearData[key].splice(i, 1);
        }
      }
    }
  }
  for (i = 0; i < $gearChildren.length; i++) {
    if ($gearChildren[i] === closestElement) {
      $gearChildren[i].remove();
      $selectChildren[i + 3].remove();
      if ($selectChildren.length <= 3) {
        var $disableOption = document.querySelector('#disabled-' + deleteGearType);
        $disableOption.className = 'view';
      }
    }
  }
  $modal.className = 'modal view hidden';
}

function renderFieldNotes(array) {
  if (array.length === 0) {
    $noNotesMsg.className = 'no-notes';
  } else {
    for (var i = 0; i < array.length; i++) {
      var fieldNote = renderNote(array[i]);
      $fieldNotes.append(fieldNote);
    }
  }
}

function newGear(event) {
  event.preventDefault();
  var addGearType = event.target.className;
  var $newGearItem = document.querySelector('#' + addGearType);
  var renderedGear = renderGearItem($newGearItem.value, addGearType);
  var $gearList = document.querySelector('.gear.' + addGearType);
  var renderedOption = renderGearOption($newGearItem.value, addGearType);
  var $selectList = document.querySelector('.select.' + addGearType);
  var $disabledOption = document.querySelector('#disabled-' + addGearType);
  gearData[addGearType].push($newGearItem.value);
  $gearList.append(renderedGear);
  $selectList.append(renderedOption);
  $disabledOption.className = 'view hidden';
  $newGearItem.value = null;
}

function deleteGearItem(event) {
  if (event.target.matches('i')) {
    $modal.className = 'modal view';
    event.target.className = 'fas fa-minus-square icon-red icon delete-gear';
    closestElement = event.target.closest('li');
  }
}

function renderGearItem(item, gearType) {
  var $gearItem = document.createElement('li');
  $gearItem.setAttribute('class', 'gear-item');
  $gearItem.setAttribute('data-gear', gearType);
  $gearItem.textContent = item;
  var $deleteGearIcon = document.createElement('i');
  $deleteGearIcon.setAttribute('class', 'fas fa-minus-square icon delete-gear');
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
    gear = renderGearItem(object.cameras[i], 'cameras');
    $gearCameras.append(gear);
    option = renderGearOption(object.cameras[i], 'cameras');
    $camera.append(option);
  }
  for (i = 0; i < object.lenses.length; i++) {
    gear = renderGearItem(object.lenses[i], 'lenses');
    $gearLenses.append(gear);
    option = renderGearOption(object.lenses[i], 'lenses');
    $lens.append(option);
  }
  for (i = 0; i < object.filters.length; i++) {
    gear = renderGearItem(object.filters[i], 'filters');
    $gearFilters.append(gear);
    option = renderGearOption(object.filters[i], 'filters');
    $filter.append(option);
  }
}

$zipForm.addEventListener('submit', requestData);

$fieldNotes.addEventListener('click', editDeleteNote);
$modalNo.addEventListener('click', closeModal);
$modalYes.addEventListener('click', function() {
  deleteNote();
  deleteGear();
});

$gearCameras.addEventListener('click', deleteGearItem);
$gearLenses.addEventListener('click', deleteGearItem);
$gearFilters.addEventListener('click', deleteGearItem);

$newCameraForm.addEventListener('submit', newGear);
$newLensForm.addEventListener('submit', newGear);
$newFilterForm.addEventListener('submit', newGear);

$navBar.addEventListener('click', pageViewSwap);
$form.addEventListener('submit', newEditNote);

window.addEventListener('DOMContentLoaded', function () {
  renderData();
  renderFieldNotes(fieldNotes.notes);
  renderGear(gearData);
});
