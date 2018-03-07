var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonData = require('./public/cleaned-master');
var pooled = require('./public/pooled');
var envelopes = require('./public/envelopes');
var path = require('path');
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	cors({
		origin:  ['http://wb-somalia-ssr.herokuapp.com', 'https://wb-somalia-ssr.herokuapp.com', 'http://somaliaaidflows.so/', 'https://somaliaaidflows.so/'],
	})
);

var valid_place_names = [
	'FGS',
	'Benadir',
	'Galmudug',
	'Hiirshabelle',
	'Jubaland',
	'Puntland',
	'South West',
	'Somaliland',
	'Unattributed',
];
var years = ['2016', '2017', '2018'];
var placeArray;
var temp_array = [];

var createCountryObject = function(location, year) {

	for (var i = 0; i < 770; i++) {
		if (year === '2016' && jsonData[i][year + ' - ' + location] > 0) {
			count2016 += 1;
			total2016 += jsonData[i][year + ' - ' + location];
		} else if (year === '2017' && jsonData[i][year + ' - ' + location] > 0) {
			count2017 += 1;
			total2017 += jsonData[i][year + ' - ' + location];
		} else if (year === '2018' && jsonData[i][year + ' - ' + location] > 0) {
			count2018 += 1;
			total2018 += jsonData[i][year + ' - ' + location];
		}
	}

	temp_obj = {
		location: location,
		total2016: total2016,
		count2016: count2016,
		total2017: total2017,
		count2017: count2017,
		total2018: total2018,
		count2018: count2018,
	};
};

var yearLoop = function(location) {
	temp_array = [];

	for (var year of years) {
		createCountryObject(location, year);
	}
	placeArray.push(temp_obj);
};

app.get('/routes', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/pooled', function(req, res) {
	res.json(pooled);
});

app.get('/envelopes', function(req, res) {
	res.json(envelopes);
});

app.get('/master', function(req, res) {
	res.json(jsonData);
});

app.get('/locations', function(req, res) {
	placeArray = [];
	for (var location of valid_place_names) {
		total2016 = 0;
		total2017 = 0;
		total2018 = 0;

		count2016 = 0;
		count2017 = 0;
		count2018 = 0;

		yearLoop(location);
	}

	res.json(placeArray);
});

var locationLoop = function() {
	for (var location of valid_place_names) {
		createCountryObject(location);
	}
};

app.listen(process.env.PORT || 3000, function() {
	console.log('listening on ' + this.address().port);
});
