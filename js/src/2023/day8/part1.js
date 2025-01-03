import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day8/part1_input.txt";

// computing a result

let lineNumber = 0;
let instructions = new Array();
let navigationMap = new Map();
let firstNode = "AAA";
let lastNode = "ZZZ";

function countSteps() {
  return countStepsFromNode(firstNode, lastNode);
}

function countStepsFromNode(startNode, stopNode) {
  let stepsCount = 0;
  let nextNode;

  for (let i=0 ; i<instructions.length ; i++) {
    if (i == 0) {
      nextNode = navigationMap.get(startNode)[instructions[i]];
    } else {
      nextNode = navigationMap.get(nextNode)[instructions[i]];
    }

    stepsCount++;

    if (nextNode == stopNode) {
      return stepsCount;
    } else if (i == instructions.length-1) {
      return stepsCount + countStepsFromNode(nextNode, lastNode);
    }
  }
}

// reading file

const fileStream = fs.createReadStream(inputFilePath);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (lineNumber == 0) {
    instructions = Array.from(line).map(elt => elt == "L" ? 0 : elt == "R" ? 1 : -1);
  } else {
    if (line.length > 0) {
      let lineSplit = line.split("=");
      let position = lineSplit[0].trim();
      let coordinatesSplit = lineSplit[1].trim().split(",");
      let coordinatesArray = new Array();
      coordinatesArray.push(coordinatesSplit[0].trim().replaceAll("(", ""), coordinatesSplit[1].trim().replaceAll(")", ""))
      navigationMap.set(position, coordinatesArray);
    }
  }

  lineNumber++;
});

rl.on('close', () => {
  // console.log(instructions);
  // console.log(navigationMap);
  console.log(countSteps());
});
