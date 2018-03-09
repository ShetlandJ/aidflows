import axios from 'axios';

export async function getAllProjects({ store, client }) {
  if (client) return;
  if (store.state.projectLocationTable.length !== 0) return;

  try {
    const res = await axios.get('https://api.80pco.com/master');
    const tree2016 = res.data.map(k => {
      return {
        'Project Title': k['Project title'],
        'NDP Pillar': k['NDP Pillar'],
        Sector: k['Primary Sector'],
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
    const tree2017 = res.data.map(k => {
      return {
        'Project Title': k['Project title'],
        'NDP Pillar': k['NDP Pillar'],
        Sector: k['Primary Sector'],
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
    const tree2018 = res.data.map(k => {
      return {
        'Project Title': k['Project title'],
        'NDP Pillar': k['NDP Pillar'],
        Sector: k['Primary Sector'],
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
    store.commit('SET_MASTER', res.data);
    store.commit('CLEAN_2016', tree2016);
    store.commit('CLEAN_2017', tree2017);
    store.commit('CLEAN_2018', tree2018);
    store.commit('SET_2016');
    store.commit('SET_2017');
    store.commit('SET_2018');
    store.commit('SET_PROJECT_LOCATION');
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
  }
}

export function excelToJsDate(excelDate) {
  if (excelDate !== null || excelDate != 11 || excelDate != 33) {
    return new Date((excelDate - (25567 + 1)) * 86400 * 1000);
  } else {
    return null;
  }
}

export function capitalizeString(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(x => x[0].toUpperCase() + x.slice(1))
    .join(' ');
}

export function formatMillion(number) {
  if (number < 1000000) {
    var num = Math.floor(number / 10000);
    return num / 100;
  } else if (number < 1000000000) {
    var num = Math.floor(number / 100000);
    return num / 10;
  }
}

// var data = require('./cleaned-master.json');

export function locationArray(dataSet) {

  const locations = [
    'FGS',
    'Benadir',
    'Galmudug',
    'Hiirshabelle',
    'Jubaland',
    'Puntland',
    'South West',
    'Somaliland',
  ];

  temp_array = []
  for (var key in dataSet) {
    for (var location of locations) {
      if (key.includes(location) && dataSet[key] > 0 && !temp_array.includes(location)) {
        temp_array.push(location)
      }
    }
  }
  dataSet.locations = temp_array.toString()
  console.log(dataSet);
}

export function dataSetLoop() {
  for (var i = 0; i < data.length; i++) {
    locationArray(data[i]);
  }
}
