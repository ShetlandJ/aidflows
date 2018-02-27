var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsonData = require("./public/cleaned-master")
var pooled = require("./public/pooled")
var envelopes = require("./public/envelopes")
var path = require('path')
var cors = require('cors');

var locationJsonData = require('../public/cleaned-master.json');


// var TreeMap2016 = require('./controllers/TreeMap2016')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(require('./controllers/Locations'));

// app.use(require('./controllers/TreeMap2016'));
// app.use(require('./controllers/TreeMap2017'));
// app.use(require('./controllers/TreeMap2018'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://wb-somalia-ssr.herokuapp.com");
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
  origin: 'https://wb-somalia-ssr.herokuapp.com',
  credentials: true
}));

app.get("/routes", function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/pooled", function(req, res){
  res.json(pooled);
});

app.get("/envelopes", function(req, res){
  res.json(envelopes);
});

app.get("/master", function(req, res){
  res.json(jsonData);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("listening on " + this.address().port );
});

valid_place_names = ["FGS", "Benadir", "Galmudug", "Hiirshabelle", "Jubaland", "Puntland", "South West", "Somaliland", "Unattributed"];
years = ["2016", "2017", "2018"];
placeArray;
temp_array = []

router.get('/location', function(req, res) {

  var yearLoop = function(location) {
    temp_array = []

    for (var year of years) {
      createCountryObject(location, year)
    }
    placeArray.push(temp_obj)
  }

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
