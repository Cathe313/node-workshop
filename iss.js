
var request = require('request');

request('http://api.open-notify.org/iss-now.json', function (error, response, body) {
  if (!error) {
    var issPoz = JSON.parse(body);
    console.log("The space station is currently at latitude " + Math.round(issPoz.iss_position.latitude * 100)/100 + " and at longitude " + Math.round(issPoz.iss_position.longitude * 100)/100 + "." ); 
  } else {
      console.log("There has been an error of type " + error);
  }
})