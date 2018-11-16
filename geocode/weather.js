const request = require('request');

var getWeatherTemperature = (lat, lng) => {
  return new Promise( (resolve, reject) => {
    var forecastUrl = `https://api.darksky.net/forecast/3ee5df68003eff98cefd980e4e89679a/${lat},${lng}`;
    request({
      url: forecastUrl,
      method: "GET",
      json: true
    }, (error, response, body) => {
      if (error) {
        reject(error);
      }
      else if (response.statusCode === 200) {
        resolve(body.currently.temperature);
      }
    });
  }
}

module.exports.getWeatherTemperature = getWeatherTemperature;
