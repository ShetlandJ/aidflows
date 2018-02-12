const d3 = Object.assign({}, require('d3-array'), require('d3-collection'));
var jsonData = require("../public/master.json")

var TreeMap = function() {
  this.cleanedTree = []
  console.log(jsonData);
}


TreeMap.prototype.cleanTree = function(data) {
  this.cleanedTree = data.map(k => {
    return {
      project: k['Nom du projet'],
      pillar: k['Pilier'],
      component: k['Composante'],
      sector: k['Secteur principal'],
      totalUSD: k['Montant du projet USD'],
      usd2017: k['Décaissements 2017 USD'],
      projectedUSD2018:
      k['Prévision de décaissements 2017 USD'] +
      k['Prévision de décaissements 2018 USD'],
      projectedUSD2019: k['Prévision de décaissements 2019 USD'],
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


module.exports = TreeMap;
