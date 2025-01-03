import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day2/part1_input.txt";
const red = "red";
const green = "green";
const blue = "blue";
const maxReds = 12;
const maxGreens = 13;
const maxBlues = 14;

function getIdOfGameOK(stringToParse) {
  let gameSplit = stringToParse.split(":");
  let gameId = gameSplit[0].split(" ")[1];
  let game = gameSplit[1];
  let sets = game.split(";");
  let maxSetsMap = new Map();
  
  sets.forEach(set => {
    let numberedColors = set.split(",");
    numberedColors.forEach(numberedColor => {
      let numberedColorSplit = numberedColor.trim().split(" ");
      let num = numberedColorSplit[0];
      let color = numberedColorSplit[1];

      let existingRed = maxSetsMap.get(red);
      existingRed = existingRed != undefined ? Number.parseInt(existingRed) : 0;
      let existingGreen = maxSetsMap.get(green);
      existingGreen = existingGreen != undefined ? Number.parseInt(existingGreen) : 0;
      let existingBlue = maxSetsMap.get(blue);
      existingBlue = existingBlue != undefined ? Number.parseInt(existingBlue) : 0;
      if ((color == red && Number.parseInt(num) > existingRed) || 
      (color == green && Number.parseInt(num) > existingGreen) || 
      (color == blue && Number.parseInt(num) > existingBlue)) {
        addSetToMap(maxSetsMap, color, num);
      }
    });
  });

  let isGameOK = true;
  maxSetsMap.forEach((value, key, map) => {
    if (key == red) {
      isGameOK &= Number.parseInt(value) <= maxReds;
    } else if (key == green) {
      isGameOK &= Number.parseInt(value) <= maxGreens;
    } else if (key == blue) {
      isGameOK &= Number.parseInt(value) <= maxBlues;
    }
  });

  console.log("gameId: " + gameId + "; isGameOK: " + isGameOK);
  console.log(maxSetsMap);

  return isGameOK ? gameId : 0;
}

function addSetToMap(setsMap, key, value) {
  setsMap.set(key, value);
}

function decodeLine(line) {
  return "" + getIdOfGameOK(line);
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
