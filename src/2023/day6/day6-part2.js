import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/day6-part2_input.txt";

function getTimes(stringToParse) {
  let times = stringToParse.split(':')[1];
  let timesArray = times.trim().split(' ');

  timesArray = timesArray.map(val => Number.parseInt(val));
  timesArray = timesArray.filter(val => !isNaN(val));

  let theTime = Number.parseInt(timesArray.join(''));
  let theArray = new Array();
  theArray.push(theTime);

  return theArray;
}

function getDistances(stringToParse) {
  let distances = stringToParse.split(':')[1];
  let distancesArray = distances.trim().split(' ');

  distancesArray = distancesArray.map(val => Number.parseInt(val));
  distancesArray = distancesArray.filter(val => !isNaN(val));

  let theDistance = Number.parseInt(distancesArray.join(''));
  let theArray = new Array();
  theArray.push(theDistance);

  return theArray;
}

// aggregating result

let result = 1;
let timesArray = new Array();
let distancesArray = new Array();

function computeCombinations(index) {
  let time = timesArray[index];
  let distance = distancesArray[index];
  let distancesRace = new Array();

  for (let i=1 ; i<=time ; i++) {
    distancesRace.push(i * (time - i));
  }

  return distancesRace.filter(v => v > distance).length;
}

function multiplyToResult(number) {
  result *= number;
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
  if (line.includes("Time")) {
    timesArray.push(...getTimes(line));
  } else if (line.includes("Distance")) {
    distancesArray.push(...getDistances(line));
  }
});

rl.on('close', () => {
  // console.log(timesArray);
  // console.log(distancesArray);
  for (let i=0 ; i<timesArray.length ; i++) {
    let combinations = computeCombinations(i);
    // console.log(combinations);
    multiplyToResult(combinations);
  }
  
  outputResult();
});

//const line = process.argv[2];
