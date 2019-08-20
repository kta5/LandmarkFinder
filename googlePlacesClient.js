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
        if (!err) {
            var i;
            var locationsString = "";
            for (i = 0; i < response.json.results.length; i++) {
                locationsString = locationsString + response.json.results[i].name;
                //console.log(response.json.results[i].name);
                //console.log(locationsString);
                //return locationsString;
            }
            console.log(locationsString);
            return locationsString;
            console.log("-----------------------------------------------------------------");
        }

    });
}

//let syncFindPlacesNearby = Promise.promisifyAll(findPlacesNearby)
module.exports = findPlacesNearby;
//module.exports = locationsString;


// function findPlacesNearby(lat, long) {
//     googleMapsClient.placesNearby({
//         //location: [34.07708, -117.88978], // Covina, CA IHOP
//         //location: [34.04707, -118.26011], //Los Angeles, CA (Flower Street) IHOP
//         location: [lat, long],
//         keyword: 'school',
//         //type: 'mall',
//         radius: 1500 //1 mile
//     }, function (err, response) {
//         //console.log('hi')
//         if (!err) {
//             var i;
//             for (i = 0; i < response.json.results.length; i++) {
//                 //console.log(response.json.results[i].name);
//                 return (response.json.results[i].name);
//             }

//         }
//     });
// }


