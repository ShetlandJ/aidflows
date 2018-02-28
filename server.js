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
		origin: 'https://wb-somalia-ssr.herokuapp.com',
	})
);

// app.use(require('./controllers/Locations'));

// app.use(require('./controllers/TreeMap2016'));
// app.use(require('./controllers/TreeMap2017'));
// app.use(require('./controllers/TreeMap2018'));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://wb-somalia-ssr.herokuapp.com");
//   res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

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

app.get('/2016', function(req, res) {

	var sortedData = []

	// return only data needed
	// simplify keys
	// make separate variables for each year
	const cleanedTree2016 = jsonData.map(k => {
		return {
			project: k['Project title'],
			pillar: k['NDP Pillar'],
			sector: k['Primary Sector'],
			FGS: k['2016 - FGS'],
			Benadir: k['2016 - Benadir'],
			Galmudug: k['2016 - Galmudug'],
			Hiirshabelle: k['2016 - Hiirshabelle'],
			Jubaland: k['2016 - Jubaland'],
			Puntland: k['2016 - Puntland'],
			'South West': k['2016 - South West'],
			Somaliland: k['2016 - Somaliland'],
			Unattributed: k['2016 - Unattributed'],
		};
	});

	// create a new object for each project that has a location-specific value greater than zero.
	cleanedTree2016.reduce(function(r, o) {
		Object.keys(o).forEach(function(k) {
			if (['project', 'pillar', 'sector'].includes(k) || !o[k]) {
				return;
			}
			r.push({
				location: k,
				value: o[k],
				project: o.project,
				pillar: o.pillar,
				sector: o.sector,
			});
		});

		sortedData.push(r);
		return r;
	}, []);

	const testData = sortedData[0];

	res.json(testData);
});

app.get('/2017', function(req, res) {

	var sortedData = []

	// return only data needed
	// simplify keys
	// make separate variables for each year
	const cleanedTree2017 = jsonData.map(k => {
		return {
			project: k['Project title'],
			pillar: k['NDP Pillar'],
			sector: k['Primary Sector'],
			FGS: k['2017 - FGS'],
			Benadir: k['2017 - Benadir'],
			Galmudug: k['2017 - Galmudug'],
			Hiirshabelle: k['2017 - Hiirshabelle'],
			Jubaland: k['2017 - Jubaland'],
			Puntland: k['2017 - Puntland'],
			'South West': k['2017 - South West'],
			Somaliland: k['2017 - Somaliland'],
			Unattributed: k['2017 - Unattributed'],
		};
	});

	// create a new object for each project that has a location-specific value greater than zero.
	cleanedTree2017.reduce(function(r, o) {
		Object.keys(o).forEach(function(k) {
			if (['project', 'pillar', 'sector'].includes(k) || !o[k]) {
				return;
			}
			r.push({
				location: k,
				value: o[k],
				project: o.project,
				pillar: o.pillar,
				sector: o.sector,
			});
		});

		sortedData.push(r);
		return r;
	}, []);

	const testDate = sortedData[0];

	res.json(testDate);
});
app.get('/2018', function(req, res) {

	var sortedData = []

	// return only data needed
	// simplify keys
	// make separate variables for each year
	const cleanedTree2018 = jsonData.map(k => {
		return {
			project: k['Project title'],
			pillar: k['NDP Pillar'],
			sector: k['Primary Sector'],
			FGS: k['2018 - FGS'],
			Benadir: k['2018 - Benadir'],
			Galmudug: k['2018 - Galmudug'],
			Hiirshabelle: k['2018 - Hiirshabelle'],
			Jubaland: k['2018 - Jubaland'],
			Puntland: k['2018 - Puntland'],
			'South West': k['2018 - South West'],
			Somaliland: k['2018 - Somaliland'],
			Unattributed: k['2018 - Unattributed'],
		};
	});

	// create a new object for each project that has a location-specific value greater than zero.
	cleanedTree2018.reduce(function(r, o) {
		Object.keys(o).forEach(function(k) {
			if (['project', 'pillar', 'sector'].includes(k) || !o[k]) {
				return;
			}
			r.push({
				location: k,
				value: o[k],
				project: o.project,
				pillar: o.pillar,
				sector: o.sector,
			});
		});

		sortedData.push(r);
		return r;
	}, []);

	const testDate = sortedData[0];

	res.json(testDate);
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
