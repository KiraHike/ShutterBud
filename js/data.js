/* exported astroData */
/* exported weatherData */

var astroData = {
  zip: null
};

var weatherData = {
  zip: null
};

window.addEventListener('beforeunload', store);

var prevAstroDataJSON = localStorage.getItem('astro-local-storage');
var prevWeatherDataJSON = localStorage.getItem('weather-local-storage');

if (prevAstroDataJSON !== null) {
  astroData = JSON.parse(prevAstroDataJSON);
}

if (prevWeatherDataJSON !== null) {
  weatherData = JSON.parse(prevWeatherDataJSON);
}

function store(event) {
  var astroDataJSON = JSON.stringify(astroData);
  localStorage.setItem('astro-local-storage', astroDataJSON);
  var weatherDataJSON = JSON.stringify(weatherData);
  localStorage.setItem('weather-local-storage', weatherDataJSON);
}
