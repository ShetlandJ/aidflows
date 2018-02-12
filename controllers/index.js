const d3 = Object.assign({}, require('d3-array'), require('d3-collection'));
var jsonData = require('../public/master.json');

var express = require('express');
var router = new express.Router();
var path = require('path');

router.use('/location', router);

var result;
var cleanTree;
const newData = {};
var sortedData = []

router.get('/', function(req, res) {
	var jsonData = require('../public/master.json');

	// return only data needed
	// simplify keys
	// make separate variables for each year
	const cleanedTree2016 = jsonData.map(k => {
		return {
			project: k['Project title'],
			pillar: k['NDP Pillar'],
			sector: k['Primary Sector'],
			// disbursements2016: k['2016 Disbursements (USD)'],
			fgs: k['2016 - FGS'],
			benadir: k['2016 - Benadir'],
			galmudug: k['2016 - Galmudug'],
			hiirshabelle: k['2016 - Hiirshabelle'],
			jubaland: k['2016 - Jubaland'],
			puntland: k['2016 - Puntland'],
			southWest: k['2016 - South West'],
			somaliland: k['2016 - Somaliland'],
			unattributed: k['2016 - Unattributed'],
		};
	});

	// console.log('nice and tidy map: ', cleanedTree2016);

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

		// console.log('brilliant awesome german function: ', r);
		sortedData.push(r)
		return r;
	}, []);

	const nested2016 = d3
	.nest()
	.key(d => d.location)
	.key(d => d.pillar)
	.key(d => d.sector)
	.key(d => d.project)
	.rollup(d => d3.sum(d, d => d.value))
	.entries(sortedData);

	console.log(nested2016);

	const tree2016 = [
		{
			name: 2016,
			children: nested2016.values.map(location => {
				return {
					name: location.key,
					children: location.values.map(pillar => {
						return {
							name: pillar.key,
							children: pillar.values.map(sector => {
								return {
									name: sector.key,
									children: sector.values.map(project => {
										return {
											name: project.key,
											value: project.value,
										};
									}),
								};
							}),
						};
					}),
				};
			})
		}
	];

	res.json(tree2016);
});
module.exports = router;
