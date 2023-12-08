import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day5/part2_input.txt";
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
let seeds = new Map();
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

function setSeeds(seedsArray) {
  for (let i=0 ; i<seedsArray.length ; i++) {
    if (i%2 == 0) {
      seeds.set(seedsArray[i], seedsArray[i+1]);
    }
  }
}

function findClosestLocation() {
  let minLocation = 10000000000;

  seeds.forEach((seedRange, seedStart) => {
    console.log("seed "+seedStart+" started");
    for (let i=seedStart; i<seedStart+seedRange ; i++) {
      let soil = getDest(data.get(seedToSoilTitle), i);
      let fertilizer = getDest(data.get(soilToFertilizerTitle), soil);
      let water = getDest(data.get(fertilizerToWaterTitle), fertilizer);
      let light = getDest(data.get(waterToLightTitle), water);
      let temperature = getDest(data.get(lightToTemperatureTitle), light);
      let humidity = getDest(data.get(temperatureToHumidityTitle), temperature);
      let location = getDest(data.get(humidityToLocationTitle), humidity);

      minLocation = location < minLocation ? location : minLocation;
    }
  });

  return minLocation;
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
    setSeeds(lineSplitColon[1].trim().split(' ').map(value => Number.parseInt(value)));
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
