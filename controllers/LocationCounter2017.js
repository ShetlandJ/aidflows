var jsonData = require('../public/cleaned-master.json');

var express = require('express');
var router = new express.Router();
var path = require('path');

router.use('/location/2017', router);

var valid_place_names = ["FGS", "Benadir", "Galmudug", "Hiirshabelle", "Jubaland", "Puntland", "South West", "Somaliland", "Unattributed"]
var placeArray;

router.get('/', function(req, res) {


locationLoop()

  res.json(placeArray);
});

var locationLoop = function() {
  for (var location of valid_place_names) {
    createCountryObject(location)
  }

}

var createCountryObject = function(location) {
  // var total = 0;
  // var count = 0;
  placeArray = []
  var jsonData = require('../public/cleaned-master.json');

  for (var location of valid_place_names) {
    var total = 0;
    var count = 0;
    var year = "2017"

    for (var i = 0; i < 770; i++) {
      if (jsonData[i][year+" - "+location] > 0) {
        count += 1;
        total += jsonData[i][year+" - "+location]
      }
    }
    var temp_obj = {
      "Location: " : location,
      "Total: " : total,
      "Count" : count

    }
    placeArray.push(temp_obj)
  }
}

module.exports = router;
