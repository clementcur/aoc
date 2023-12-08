import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day4/part1_input.txt";

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

function doublePoints(points) {
  return 2**(points-1);
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

  console.log(matches);

  return doublePoints(Array.from(new Set(matches)).length);
}

// aggregating result

let result = 0;

function addToResult(number) {
  result += number;
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
    addToResult(Number.parseInt(countPoints(line)));
});

rl.on('close', () => {
    outputResult();
});

//const line = process.argv[2];
