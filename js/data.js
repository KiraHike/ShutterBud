/* exported astroData */
/* exported weatherData */
/* exported fieldNotes */
/* exported gearData */

var astroData = {
  zip: null
};

var weatherData = {
  zip: null
};

var fieldNotes = {
  notes: [],
  nextNum: 1,
  edit: null
};

var gearData = {
  cameras: [],
  lenses: [],
  filters: []
}

window.addEventListener('beforeunload', store);

var prevAstroDataJSON = localStorage.getItem('astro-local-storage');
var prevWeatherDataJSON = localStorage.getItem('weather-local-storage');
var prevFieldNotesJSON = localStorage.getItem('field-notes-local-storage');
var prevGearDataJSON = localStorage.getItem('gear-local-storage');

if (prevAstroDataJSON !== null) {
  astroData = JSON.parse(prevAstroDataJSON);
}

if (prevWeatherDataJSON !== null) {
  weatherData = JSON.parse(prevWeatherDataJSON);
}

if (prevFieldNotesJSON !== null) {
  fieldNotes = JSON.parse(prevFieldNotesJSON);
}

if (prevGearDataJSON !== null) {
  gearData = JSON.parse(prevGearDataJSON);
}

function store(event) {
  var astroDataJSON = JSON.stringify(astroData);
  localStorage.setItem('astro-local-storage', astroDataJSON);
  var weatherDataJSON = JSON.stringify(weatherData);
  localStorage.setItem('weather-local-storage', weatherDataJSON);
  var fieldNotesJSON = JSON.stringify(fieldNotes);
  localStorage.setItem('field-notes-local-storage', fieldNotesJSON);
  var gearDataJSON = JSON.stringify(gearData);
  localStorage.setItem('gear-local-storage', gearDataJSON);
}
