const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to get weather',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.a);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCevZ3HAaJfY4ZVsxXIQ5fbMrAmYPGiyto`;

axios.get(geocodeUrl).then( (response) => {
  if (response.data.status === 'OK') {
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    console.log(JSON.stringify(response.data, undefined, 2));
    console.log(response.data.results[0].formatted_address);
    var forecastUrl = `https://api.darksky.net/forecast/3ee5df68003eff98cefd980e4e89679a/${lat},${lng}`;
    axios.get(forecastUrl).then( (response) => {
      if (response.data.status === 'OK') {
      console.log(response.data.currently.temperature);
    } else {
      throw new Error('Unable to Fetch Data from googleapis');
    }
    });
  } else if (response.data.status === "ZERO_RESULTS"){
    throw new Error('Unable to Fetch Data from forecast');
  }

}).catch( (e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to Connect to API');
  } else {
    console.log(e.message);
  }
})
