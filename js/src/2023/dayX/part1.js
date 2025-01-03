import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/dayX/part1_input.txt";

function findSomething(stringToParse) {
  return stringToParse;
}

function decodeLine(line) {
  return "" + findSomething(line);
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

rl.on('line', (line) => {
  addToResult(Number.parseInt(decodeLine(line)));
});

rl.on('close', () => {
  outputResult();
});

//const line = process.argv[2];
