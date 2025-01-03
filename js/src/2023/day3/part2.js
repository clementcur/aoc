import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day3/part2_input.txt";
let numberAsciiCodes = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
let starSymbolAsciiCode = 42;

function mapNumbers(stringToParse) {
  let stringAsArray = Array.from(stringToParse.toString());
  let numbersArray = new Array(stringAsArray.length);
  numbersArray = numbersArray.fill(-1);

  let aNumber = [];
  let numIndexStart = -1;
  let numIndexStop = -1;
  for (let i = 0; i < stringAsArray.length; i++) {
    if (isNumber(stringAsArray[i])) {
      aNumber.push(stringAsArray[i]);
      if (numIndexStart == -1) {
        numIndexStart = i;
      }

      if (i == stringAsArray.length -1) {
        numIndexStop = i;

        let num = Number.parseInt(aNumber.join(''));
        for (let j=numIndexStart; j <= numIndexStop; j++) {
          numbersArray[j] = num;
        }
        
        aNumber = [];
        numIndexStart = -1;
        numIndexStop = -1;
      }
    } else if (numIndexStart != -1) {
      numIndexStop = i-1;
      
      let num = Number.parseInt(aNumber.join(''));
      for (let j=numIndexStart; j <= numIndexStop; j++) {
        numbersArray[j] = num;
      }

      aNumber = [];
      numIndexStart = -1;
      numIndexStop = -1;
    }
  }

  return numbersArray;
}

function indexSymbols(stringToParse) {
  let symbolsLine = [];
  let stringAsArray = Array.from(stringToParse.toString());

  for (let i = 0; i < stringAsArray.length; i++) {
    if (isStarSymbol(stringAsArray[i])) {
      symbolsLine.push(i);
    }
  }

  return symbolsLine;
}

function findGearRatios(aSymbolsMap, aNumbersMap) {
  let gearRatios = new Array();

  aSymbolsMap.forEach((symbolIndexesArray, lineNumber, symbolMap) => {
    //console.log("lineNumber: " + lineNumber);
    if (symbolIndexesArray != undefined && symbolIndexesArray.length > 0) {
      let numbersPreviousLine = aNumbersMap.get(lineNumber - 1);
      let numbersCurrentLine = aNumbersMap.get(lineNumber);
      let numbersNextLine = aNumbersMap.get(lineNumber + 1);

      symbolIndexesArray.forEach(symbolIndex => {
        let partNumbers = [];

        if (numbersPreviousLine != undefined && numbersPreviousLine.length > 0) {
          let adjacentNums = getAdjacentNumbers(symbolIndex-1, symbolIndex+1, numbersPreviousLine);
          if(adjacentNums != undefined && adjacentNums.length > 0) {
            partNumbers.push(...adjacentNums);
          }
        }

        if (numbersCurrentLine != undefined && numbersCurrentLine.length > 0) {
          let adjacentNums = getAdjacentNumbers(symbolIndex-1, symbolIndex-1, numbersCurrentLine);
          adjacentNums.push(...getAdjacentNumbers(symbolIndex+1, symbolIndex+1, numbersCurrentLine));
          partNumbers.push(...adjacentNums);
        }

        if (numbersNextLine != undefined && numbersNextLine.length > 0) {
          let adjacentNums = getAdjacentNumbers(symbolIndex-1, symbolIndex+1, numbersNextLine);
          if(adjacentNums != undefined && adjacentNums.length > 0) {
            partNumbers.push(...adjacentNums);
          }
        }

        console.log(partNumbers);
        if (partNumbers.length == 2) {
          gearRatios.push(partNumbers[0]*partNumbers[1]);
        }
      });
    }
  });

  return gearRatios;
}

function getAdjacentNumbers(startPos, stopPos, numbersArray) {
  let adjNums = [];

  for (let i=startPos; i<= stopPos; i++) {
    if (numbersArray[i] != -1) {
      adjNums.push(numbersArray[i]);
    }
  }
  
  // remove duplicates
  return Array.from(new Set(adjNums));
}

function isStarSymbol(stringToTest) {
  let stringAsciiCode = stringToTest.charCodeAt(0);
  return starSymbolAsciiCode == stringAsciiCode;
}

function isNumber(stringToTest) {
  let stringAsciiCode = stringToTest.charCodeAt(0);
  return numberAsciiCodes.includes(stringAsciiCode);
}

// aggregating result

let result = 0;
let lineNumber = 0;
let symbolsMap = new Map();
let numbersMap = new Map();

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
  symbolsMap.set(lineNumber, indexSymbols(line));
  numbersMap.set(lineNumber, mapNumbers(line));

  lineNumber++;
});

rl.on('close', () => {
  // console.log(symbolsMap);
  // console.log(numbersMap);

  let gearRatios = findGearRatios(symbolsMap, numbersMap);
  result = gearRatios.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  outputResult();
});

//const line = process.argv[2];
