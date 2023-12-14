import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day8/part2_input.txt";

const gcd = (a, b) => b == 0 ? a : gcd (b, a % b);
const lcm = (a, b) =>  a / gcd (a, b) * b;
const lcmAll = (ns) => ns .reduce (lcm, 1);

// computing a result

let lineNumber = 0;
let instructions = new Array();
let navigationMap = new Map();
let endFirstNode = "A";
let endLastNode = "Z";

function countSteps() {
  let stepsCounts = new Array();
  let firstNodes = Array.from(navigationMap.keys()).filter(key => key.endsWith(endFirstNode));

  for (let k=0; k<firstNodes.length ; k++) {
    stepsCounts[k] = countStepsFromNode(firstNodes[k]);
  }

  return stepsCounts;
}

function countStepsFromNode(startNode) {
  let stepsCount = 0;
  let nextNode;

  for (let i=0 ; i<instructions.length ; i++) {
    if (i == 0) {
      nextNode = navigationMap.get(startNode)[instructions[i]];
    } else {
      nextNode = navigationMap.get(nextNode)[instructions[i]];
    }

    stepsCount++;

    if (nextNode.charAt(2) == endLastNode) {
      return stepsCount;
    } else if (i == instructions.length-1) {
      return stepsCount + countStepsFromNode(nextNode);
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
  let steps = countSteps();

  console.log(lcmAll(steps));
});
