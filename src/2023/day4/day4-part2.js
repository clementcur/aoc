import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/day4-part2_input.txt";

function getWinningNumbers(stringToParse) {
  let numbers = stringToParse.split(':')[1];
  let winningNumbers = numbers.split('|')[0];
  let winningNumbersArray = winningNumbers.trim().split(' ');

  winningNumbersArray = winningNumbersArray.map(val => Number.parseInt(val));

  return winningNumbersArray;
}

function getMyNumbers(stringToParse) {
  let numbers = stringToParse.split(':')[1];
  let myNumbers = numbers.split('|')[1];
  let myNumbersArray = myNumbers.trim().split(' ');

  myNumbersArray = myNumbersArray.map(val => Number.parseInt(val));

  return myNumbersArray;
}

function countPoints(line) {
  let winningNumbers = Array.from(new Set(getWinningNumbers(line)));
  let myNumbers = Array.from(new Set(getMyNumbers(line)));
  let matches = [];

  // console.log(winningNumbers);
  // console.log(myNumbers);

  myNumbers.forEach((v) => {
    if (v != undefined && !isNaN(v) && winningNumbers.includes(v)) {
      matches.push(v);
    }
  });

  // console.log(matches);

  return Array.from(new Set(matches)).length;
}

// aggregating result

let result = 0;
let allPoints = [];
let cardInstances = [];

function countAllPoints(points) {
  allPoints.push(points);
}

function countCardInstances() {
  cardInstances = new Array(allPoints.length);
  cardInstances = cardInstances.fill(1);

  for (let i=0 ; i<allPoints.length ; i++) {
    if (allPoints[i] > 0) {
      for (let j=i+1 ; j<i+1+allPoints[i] ; j++) {
        let currentNbCards = cardInstances[i];
        for ( let k=0 ; k<currentNbCards; k++ ) {
          cardInstances[j]++;
        }
      }
    }
  }
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

rl.on('line', (line, result) => {
    countAllPoints(Number.parseInt(countPoints(line)));
});

rl.on('close', () => {
  // console.log(allPoints);
  countCardInstances();
  // console.log(cardInstances);

  result = cardInstances.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  outputResult();
});

//const line = process.argv[2];
