const d3 = Object.assign({}, require('d3-array'), require('d3-collection'));
var jsonData = require("../public/master.json")

var express = require("express");
var router = new express.Router();
var path = require('path');

router.use("/location", router)

var result;
var cleanTree;
const newData = {};

router.get("/", function(req, res){
  cleanedTree = jsonData.map(k => {
    return {
      project: k['Project title'],
      pillar: k['NDP Pillar'],
      sector: k['Primary Sector'],
      disbursements2016: k["2016 Disbursements (USD)"]
    };
  });

  result = jsonData.reduce(function (r, o) {
    Object.keys(o).forEach(function (k)  {
      if (['project', 'pillar', 'sector'].includes(k) || !o[k]) {
        return;
      }
      r.push({ location: k, value: o[k], name: o.name, 'date started': o['date started'] });
    });
    console.log(r);
    return r;
  }, []);


  newData = d3
  .nest()
  .key(d => d.pillar)
  .key(d => d.sector)
  .key(d => d.project)
  .rollup(d => d3.sum(d, d => d.disbursements2016))
  .entries(cleanTree);
  tree2016 = [
    {
      name: 2016,
      children: tree2016.values.map(pillar => {
        return {
          name: pillar.key,
          children: component.values.map(sector => {
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
    }]


    res.json(newData)
  })


  class TreeMap {
    constructor(data) {
      this.data = jsonData
    }
  }


  TreeMap.prototype.cleanTree = function(data) {
    this.cleanedTree = data.map(k => {
      return {
        project: k['Project Title'],
        pillar: k['Pillar'],
        sector: k['Primary Sector'],
      };
    });
  },

  TreeMap.prototype.setTrees = function(data) {

    SET_TREES: (state, data) => {
      state.tree2017.values = d3
      .nest()
      .key(d => d.pillar)
      .key(d => d.component)
      .key(d => d.sector)
      .key(d => d.project)
      .rollup(d => d3.sum(d, d => d.usd2017))
      .entries(state.cleanTree);
      state.tree2017 = [
        {
          name: 2017,
          children: state.tree2017.values.map(pillar => {
            return {
              name: pillar.key,
              children: pillar.values.map(component => {
                return {
                  name: component.key,
                  children: component.values.map(sector => {
                    return {
                      name: sector.key,
                      children: sector.values.map(project => {
                        return {
                          name: project.key,
                          value: project.value,
                          url: `http://suiviaide-rca.cf/projects/${project.key}`,
                        };
                      }),
                    };
                  }),
                };
              }),
            };
          }),
        },
      ];
    }
  }

  module.exports = router;
