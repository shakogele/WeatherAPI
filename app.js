const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./geocode/weather');

const argv = yargs.options({
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

geocode.geocodeAddress(argv.a, (address) => {
  if (error) {
    console.log(error);
  } else if (!error) {
    console.log("Address Is: ", JSON.stringify(address.formatted_address, undefined, 2));
    var lat = address.geometry.location.lat;
    var lng = address.geometry.location.lng;
    weather.getWeatherTemperature(lat, lng, (error, temperature) => {
      if(error) {
        console.log(error);
      } else if(!error) {
        console.log("Temperature Is: " , temperature);
      }
    });
  }
});
