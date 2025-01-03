import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day1/part1_input.txt";
const digitZeroAsciiCode = 48;
const digitNineAsciiCode = digitZeroAsciiCode + 9;
//const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function firstDigit(stringToParse) {
  return Array.from(stringToParse.toString()).find(char => char.charCodeAt(0) >= digitZeroAsciiCode && char.charCodeAt(0) <= digitNineAsciiCode);
}

function lastDigit(stringToParse) {
  return Array.from(stringToParse.toString()).reverse().find(char => char.charCodeAt(0) >= digitZeroAsciiCode && char.charCodeAt(0) <= digitNineAsciiCode);
}

function decodeLine(line) {
  return "" + firstDigit(line) + lastDigit(line);
}

// aggregating result

var result = 0;

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
    addToResult(Number.parseInt(decodeLine(line)));
});

rl.on('close', () => {
    outputResult();
});

//const line = process.argv[2];
