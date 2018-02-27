var jsonData = require('../public/cleaned-master.json');

var express = require('express');
var router = new express.Router();
var path = require('path');


router.use('/locations', router);

var valid_place_names = ["FGS", "Benadir", "Galmudug", "Hiirshabelle", "Jubaland", "Puntland", "South West", "Somaliland", "Unattributed"];
var years = ["2016", "2017", "2018"];
var placeArray;
var temp_array = []

router.get('/', function(req, res) {

  placeArray = []
  for (var location of valid_place_names) {
     total2016 = 0;
     total2017 = 0;
     total2018 = 0;

     count2016 = 0;
     count2017 = 0;
     count2018 = 0;

    yearLoop(location)
  }

  res.json(placeArray);
});

var locationLoop = function() {
  for (var location of valid_place_names) {
    createCountryObject(location)
  }
}

var createCountryObject = function(location, year) {
  var jsonData = require('../public/cleaned-master.json');

  for (var i = 0; i < 770; i++) {
    if (year === "2016" && jsonData[i][year+" - "+location] > 0) {
      count2016 += 1;
      total2016 += jsonData[i][year+" - "+location]
    } else if (year === "2017" && jsonData[i][year+" - "+location] > 0) {
      count2017 += 1;
      total2017 += jsonData[i][year+" - "+location]
    } else if (year === "2018" && jsonData[i][year+" - "+location] > 0) {
      count2018 += 1;
      total2018 += jsonData[i][year+" - "+location]
    }
  }

  temp_obj = {
    "location": location,
    "total2016": total2016,
    "count2016": count2016,
    "total2017": total2017,
    "count2017": count2017,
    "total2018": total2018,
    "count2018": count2018

  }
}

var yearLoop = function(location) {
  temp_array = []

  for (var year of years) {
    createCountryObject(location, year)
  }
  placeArray.push(temp_obj)
}

module.exports = router;
