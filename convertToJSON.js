
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
fs.createReadStream('ihopLocations.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {

    var postJSON = JSON.stringify(results);
    var fs = require('fs');
    fs.writeFile("ihopLocations.json", postJSON, function (err, result) {
      if (err) console.log('error', err);
    });
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });



/*
module.exports = {
  initialize
}


function initialize() {
  //var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  var request = {
    location: address,
    radius: '500',
    type: ['restaurant']
  };


}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
    }
  }
}
*/
