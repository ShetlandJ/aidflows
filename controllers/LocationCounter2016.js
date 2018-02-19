var jsonData = require('../public/cleaned-master.json');

var express = require('express');
var router = new express.Router();
var path = require('path');

router.use('/location/2016', router);

var valid_place_names = ["FGS", "Benadir", "Galmudug", "Hiirshabelle", "Jubaland", "Puntland", "South West", "Somaliland", "Unattributed"]
var my_places = []

router.get('/', function(req, res) {

  for (var place of valid_place_names) {
    my_places.push(place)
  }


	res.json(my_places);
});
module.exports = router;
