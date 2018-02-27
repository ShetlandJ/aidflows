var d3 = require('d3')
var jsonData = require('../public/cleaned-master.json');

var express = require('express');
var router = new express.Router();
var path = require('path');


router.use('/2018', router);

var result;
var cleanTree;
const newData = {};
var sortedData = []

router.get('/', function(req, res) {
	var jsonData = require('../public/cleaned-master.json');

	// return only data needed
	// simplify keys
	// make separate variables for each year
	const cleanedTree2016 = jsonData.map(k => {
		return {
			project: k['Project title'],
			pillar: k['NDP Pillar'],
			sector: k['Primary Sector'],
			fgs: k['2018 - FGS'],
			benadir: k['2018 - Benadir'],
			galmudug: k['2018 - Galmudug'],
			hiirshabelle: k['2018 - Hiirshabelle'],
			jubaland: k['2018 - Jubaland'],
			puntland: k['2018 - Puntland'],
			southWest: k['2018 - South West'],
			somaliland: k['2018 - Somaliland'],
			unattributed: k['2018 - Unattributed'],
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

		sortedData.push(r)
		return r;
	}, []);

	const testDate = sortedData[0]

	const nested2016 = d3
	.nest()
	.key(d => d.location)
	.key(d => d.pillar)
	.key(d => d.sector)
	.key(d => d.project)
	.rollup(d => d3.sum(d, d => d.value))
	.entries(testDate);

	res.json(testDate);
});
module.exports = router;
