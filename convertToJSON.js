

/* Creates JSON file from .csv file*/


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
  });
