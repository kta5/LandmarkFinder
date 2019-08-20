//import * as myLocations from "./ihopLocations";
var express = require("express");
var fs = require('fs');
var csvWriter = require('csv-write-stream');

var myLocations = require("./ihopLocations");
//var findPlacesNearby = require("./googlePlacesClient");
console.log(myLocations);
//['1', '2']



var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBqsRqdca3Mn6W0B7vnGfjjUCt85PXZPJ0'
});

function findPlacesNearby(lat, long) {
    googleMapsClient.placesNearby({
        //location: [34.07708, -117.88978], // Covina, CA IHOP
        //location: [34.04707, -118.26011], //Los Angeles, CA (Flower Street) IHOP
        location: [lat, long],
        keyword: 'school',
        //type: 'mall',
        radius: 1500 //1 mile
    }, function (err, response) {
        //console.log('hi')
        var writer = csvWriter();
        if (!err) {
            var i;
            var locationsString;
            for (i = 0; i < response.json.results.length; i++) {
                locationsString = locationsString + (response.json.results[i].name);
                writer.pipe(fs.createWriteStream('out.csv', {flags: 'a'}));
                writer.write({ locations: "locationsString" });
                //console.log(response.json.results[i].name);
                console.log(locationsString);
                //return locationsString;
            }
            console.log("-----------------------------------------------------------------");
        }
        //writer.end();
    });
}

var test1 = myLocations.map(function (location) {
    return findPlacesNearby((location.lat), (location.lng));
});

console.log(test1);
// [Promise, Promise]





