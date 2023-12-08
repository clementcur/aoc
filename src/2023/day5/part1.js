import fs from "fs";
import readline from "readline";
// import LargeMap from 'large-map';

const inputFilePath = "./src/2023/day5/part1_input.txt";
const numRegex = /\d+/;
const seedToSoilTitle = "seed-to-soil";
const soilToFertilizerTitle = "soil-to-fertilizer";
const fertilizerToWaterTitle = "fertilizer-to-water";
const waterToLightTitle = "water-to-light";
const lightToTemperatureTitle = "light-to-temperature";
const temperatureToHumidityTitle = "temperature-to-humidity";
const humidityToLocationTitle = "humidity-to-location";

function hasANumber(stringToTest) {
  return stringToTest.match(numRegex) !== null;
}

// aggregating result
let lineNumber = 0;
let result = 0;
let seeds = new Array();
let data = new Map([[seedToSoilTitle, new Map()],
[soilToFertilizerTitle, new Map()],
[fertilizerToWaterTitle, new Map()],
[waterToLightTitle, new Map()],
[lightToTemperatureTitle, new Map()],
[temperatureToHumidityTitle, new Map()],
[humidityToLocationTitle, new Map()]]);
let sortedData = new Map([[seedToSoilTitle, new Map()],
[soilToFertilizerTitle, new Map()],
[fertilizerToWaterTitle, new Map()],
[waterToLightTitle, new Map()],
[lightToTemperatureTitle, new Map()],
[temperatureToHumidityTitle, new Map()],
[humidityToLocationTitle, new Map()]]);
let currentSection = "";

// function addDataToCurrentSection(lineData) {
//   let sectionData = data.get(currentSection);
//   for (let i=0 ; i<lineData[2] ; i++) {
//     sectionData.set(lineData[1]+i, lineData[0]+i);
//   }

//   data.set(currentSection, sectionData);
// }
//
// function findClosestLocation() {
//   let locations = new Array();

//   seeds.forEach(seed => {
//     let soil = data.get(seedToSoilTitle).get(seed);
//     soil = soil ? soil : seed;
//     let fertilizer = data.get(soilToFertilizerTitle).get(soil);
//     fertilizer = fertilizer ? fertilizer : soil;
//     let water = data.get(fertilizerToWaterTitle).get(fertilizer);
//     water = water ? water : fertilizer;
//     let light = data.get(waterToLightTitle).get(water);
//     light = light ? light : water;
//     let temperature = data.get(lightToTemperatureTitle).get(light);
//     temperature = temperature ? temperature : light;
//     let humidity = data.get(temperatureToHumidityTitle).get(temperature);
//     humidity = humidity ? humidity : temperature;
//     let location = data.get(humidityToLocationTitle).get(humidity);
//     location = location ? location : humidity;

//     locations.push(location);
//   });

//   // console.log(locations);
//   locations.sort((a,b) => a - b);
//   // console.log(locations);

//   return locations[0];
// }

function addDataToCurrentSection(lineData) {
  let sectionData = data.get(currentSection);
  sectionData.set(lineData[1], [lineData[0], lineData[2]]);

  data.set(currentSection, sectionData);
}

function sortSectionData() {
  data.forEach((v,k) => {
    let sectionDataKeys = new Array(...v.keys());
    sectionDataKeys.sort((a,b) => a - b);

    let sortedSectionData = sortedData.get(k);
    sectionDataKeys.forEach(key => {
      sortedSectionData.set(key, data.get(k).get(key));
    });
    sortedData.set(k, sortedSectionData);
  });
}

function findClosestLocation() {
  let locations = new Array();

  seeds.forEach(seed => {
    let soil = getDest(data.get(seedToSoilTitle), seed);
    let fertilizer = getDest(data.get(soilToFertilizerTitle), soil);
    let water = getDest(data.get(fertilizerToWaterTitle), fertilizer);
    let light = getDest(data.get(waterToLightTitle), water);
    let temperature = getDest(data.get(lightToTemperatureTitle), light);
    let humidity = getDest(data.get(temperatureToHumidityTitle), temperature);
    let location = getDest(data.get(humidityToLocationTitle), humidity);

    locations.push(location);
  });

  // console.log(locations);
  locations.sort((a,b) => a - b);
  // console.log(locations);

  return locations[0];
}

function getDest(inputMap, sourceNumber) {
  let inputDest = inputMap.get(sourceNumber);
  let dest = 0;

  if (inputDest == undefined) {
    inputMap.forEach((v,k) => {
      if (sourceNumber <= k + v[1] && sourceNumber >= k) {
        dest = sourceNumber + v[0] - k;
      }
    });

    if (dest == 0) {
      dest = sourceNumber;
    }
  } else {
    dest = inputDest[0];
  }

  return dest;
}

function outputResult() {
  console.log(result);
}

// reading file

const fileStream = fs.createReadStream(inputFilePath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  let lineSplitColon = line.split(':');

  if (line.includes(":")) {
    let sectionTitle = lineSplitColon[0];
    if (sectionTitle.includes(" ")) {
      currentSection = sectionTitle.split(" ")[0];
    }
  }

  if (lineNumber == 0) {
    seeds = lineSplitColon[1].trim().split(' ').map(value => Number.parseInt(value));
  } else {
    if (line.length > 0) {
      if(hasANumber(line)) {
        addDataToCurrentSection(line.trim().split(' ').map(value => Number.parseInt(value)));
      }
    }
  }

  lineNumber++;
});

rl.on('close', () => {
  // console.log(seeds);
  // console.log(data);

  sortSectionData();
  // console.log(sortedData);

  result = findClosestLocation();
  outputResult();
});

//const line = process.argv[2];
