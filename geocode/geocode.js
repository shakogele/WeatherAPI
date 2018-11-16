const request = require('request');

var geocodeAddress = (address) => {
  return new Promise( (resolve, reject) => {
    var address = encodeURIComponent(address);
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCevZ3HAaJfY4ZVsxXIQ5fbMrAmYPGiyto`;
    request({
      url: url,
      method: "GET",
      json: true
    }, (error, response, body) => {
      if (error) {
        reject(error);
      }
      if (body.status === "OK") {
        resolve(body.results[0]);
      } else if (body.status === "ZERO_RESULTS") {
        reject("Undable to find that location");
      }
    })
  })
}

module.exports.geocodeAddress = geocodeAddress;
