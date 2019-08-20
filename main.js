
var express = require("express");
var fs = require('fs');
var csvWriter = require('csv-write-stream');
var myLocations = require("./ihopLocations");
//var findPlacesNearby = require("./googlePlacesClient");
//console.log(myLocations);


//Connects to Google Maps API with an API Key
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBqsRqdca3Mn6W0B7vnGfjjUCt85PXZPJ0'
});

/* Takes in Latitude and Longitude arguments and finds nearby landmarks */
function findPlacesNearby(location) {

    if (!location.location_name) {
        return;
    }

    var locationsString = location.location_name + "," + location.fid + "," + location.lid;

    googleMapsClient.placesNearby({
        //location: [34.07708, -117.88978], // Covina, CA IHOP
        //location: [34.04707, -118.26011], //Los Angeles, CA (Flower Street) IHOP
        location: [location.lat, location.lng],
        keyword: '', //filter landmarks
        //type: 'mall',
        radius: 1500 //1 mile radius


    }, function (err, response) {
        if (!err) {
            var i;
            var nearbyLocations = '';
            var nearbyLocationsTemp = [];
            var finalSortedRatingArray = [];
            for (i = 0; i < response.json.results.length; i++) {
                //nearbyLocationsTemp.append(response.json.results);
                // console.log(nearbyLocationsTemp);
                if (i > 0) {
                    nearbyLocations = nearbyLocations + "|";
                }

                if (response.json.results[i] && response.json.results[i].name) {
                    nearbyLocations = nearbyLocations + (response.json.results[i].name); //appends landmark names to a single string
                    //console.log(response.json.results[i]);
                }
                nearbyLocationsTemp.push(response.json.results[i]);

            }
            finalSortedRatingArray = sortNearbyLocations(nearbyLocationsTemp);
           


            locationsString = locationsString;// + "," + nearbyLocations;

            console.log(locationsString); console.log(finalSortedRatingArray);
            for (j = 0; j < finalSortedRatingArray.length; j++) {
                //console.log(finalSortedRatingArray[j].rating + " : " + finalSortedRatingArray[j].name);
            }
            console.log("-----------------------------------------------------------------");
            return locationsString;
        }
        //writer.end();
    });
}

var test1 = myLocations.map(function (location) { //iterates through each location in ihopLocations.json

    return findPlacesNearby(location); //call findPlacesNearby method
});

function sortNearbyLocations(locationsList) {

    function Descending(a, b) {
        return b.rating - a.rating;
        //if (a[0] > b[0]) return -1;
        //if (a[0] < b[0]) return 1;
        //return 0;
    }


    var j;
    var newTempArray = [];
    for (j = 1; j < locationsList.length; j++) {
        if (locationsList[j].rating == undefined) {
            j++; //removes undefined rating
        }
        else {
            newTempArray.push(locationsList[j].rating, locationsList[j].name); //links landmark name to rating
        }
    }
    //console.log(newArray);
    //console.log(newTempArray);
    //newTempArray.sort(function (a, b) { return b-a; });

    newTempArray.sort(Descending);
    //console.log(newTempArray);
    return newTempArray;

}


//console.log(test1);
// var writer = csvWriter();
//     writer.pipe(fs.createWriteStream('out.csv', { flags: 'a' })); //initialize .csv file
//     writer.writeRecords(test1);
//     writer.write({ locations: test1 }); //Append landmark string to .csv
