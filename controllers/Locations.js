var jsonData = require('../public/cleaned-master.json');

var express = require('express');
var router = new express.Router();
var path = require('path');

router.use('/locations', router);

var valid_place_names = ["FGS", "Benadir", "Galmudug", "Hiirshabelle", "Jubaland", "Puntland", "South West", "Somaliland", "Unattributed"];
var years = ["2016", "2017", "2018"];
var placeArray;

router.get('/', function(req, res) {


  placeArray = []
  for (var location of valid_place_names) {
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
  // placeArray = []
  var jsonData = require('../public/cleaned-master.json');

  var total = 0;
  var count = 0;

  for (var i = 0; i < 770; i++) {
    if (jsonData[i][year+" - "+location] > 0) {
      count += 1;
      total += jsonData[i][year+" - "+location]
    }
  }

  var totalKey = "Total"+year
  var countKey = "Count"+year
  temp_obj = {

    [totalKey] : total,
    [countKey] : count
  }

  temp_array.push(temp_obj)
}

var yearLoop = function(location) {
  temp_array = []

  for (var year of years) {
    createCountryObject(location, year)
  }
  placeArray.push( { [location] : temp_array } )
}

module.exports = router;
