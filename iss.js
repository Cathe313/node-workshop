
var prompt = require('prompt');
var request = require('request');
//var userLocation = require('request');

Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
}

//This code prompts the user for his/her location:
    prompt.start();
    prompt.get(['city'], function(error, result) {
        if (error) {
            console.log("The input is not valid.");
        } else {
            var userCity = result.city;
            //This code gets the coordinates of the user:
            request("https://maps.googleapis.com/maps/api/geocode/json?address=" + userCity, function (error, response, body) {
                if (!error) {
                    var userPoz = JSON.parse(body);
                    console.log("You are currently at latitude " + Math.round(userPoz.results[0].geometry.location.lat * 100)/100 + " x longitude " + Math.round(userPoz.results[0].geometry.location.lng * 100)/100 + "." ); 
                    var userLat = Math.round(userPoz.results[0].geometry.location.lat * 100)/100;
                    var userLong = Math.round(userPoz.results[0].geometry.location.lng * 100)/100;
                    //This code gets the coordinates of the ISS:
                    request('http://api.open-notify.org/iss-now.json', function (error, response, body) {
                        if (!error) {
                            var issPoz = JSON.parse(body);
                            console.log("The space station is currently at latitude " + Math.round(issPoz.iss_position.latitude * 100)/100 + " and at longitude " + Math.round(issPoz.iss_position.longitude * 100)/100 + "." ); 
                            var issLat = Math.round(issPoz.iss_position.latitude * 100)/100;
                            var issLong = Math.round(issPoz.iss_position.longitude * 100)/100;
                            //This super-brainy code calculates the distance between the user and the ISS:
                            var R = 6371000; // metres
                            var φ1 = issLat.toRadians();
                            var φ2 = userLat.toRadians();
                            var Δφ = (userLat-issLat).toRadians();
                            var Δλ = (userLong-issLong).toRadians();
                            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                                Math.cos(φ1) * Math.cos(φ2) *
                                Math.sin(Δλ/2) * Math.sin(Δλ/2);
                            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                            var d = R * c;
                            console.log ("The distance between you and the ISS is " + Math.round(d / 1000) + " kilometres.")
                        } else {
                            console.log("There has been an " + error);
                        }
                })
                    
                        } else {
                            console.log("There has been an " + error);
                        }
                    })
            
        }
    })

