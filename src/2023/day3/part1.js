import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day3/part1_input.txt";
let numberAsciiCodes = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
let nonSymbolAsciiCodes = new Array(46, ...numberAsciiCodes);

function mapNumbers(stringToParse) {
  let numbersArray = [];
  let stringAsArray = Array.from(stringToParse.toString());

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
        numbersArray.push({"start": numIndexStart, "stop" : numIndexStop, "val": Number.parseInt(aNumber.join(''))});
        aNumber = [];
        numIndexStart = -1;
        numIndexStop = -1;
      }
    } else if (numIndexStart != -1) {
      numIndexStop = i-1;
      numbersArray.push({"start": numIndexStart, "stop" : numIndexStop, "val": Number.parseInt(aNumber.join(''))});
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
    if (isSymbol(stringAsArray[i])) {
      symbolsLine.push(i);
    }
  }

  return symbolsLine;
}

function findPartNumbers(aSymbolsMap, aNumbersMap) {
  let partNumbers = new Array();

  aNumbersMap.forEach((numberObjArray, lineNumber, numberMap) => {
    //console.log("lineNumber: " + lineNumber);
    if (numberObjArray != undefined && numberObjArray.length > 0) {

      //console.log("numberObjArray not null: " + numberObjArray);
      let symbolsPreviousLine = aSymbolsMap.get(lineNumber - 1);
      let symbolsCurrentLine = aSymbolsMap.get(lineNumber);
      let symbolsNextLine = aSymbolsMap.get(lineNumber + 1);

      numberObjArray.forEach(numberObj => {
        let isAPartNumber = false;

        if (symbolsPreviousLine != undefined && symbolsPreviousLine.length > 0) {
          //console.log("adjacent previous line for " + numberObj.val + ": " + hasAdjacentSymbol(numberObj.start, numberObj.stop, symbolsPreviousLine));
          isAPartNumber |= hasAdjacentSymbol(numberObj.start, numberObj.stop, symbolsPreviousLine);
        }
        if (symbolsCurrentLine != undefined && symbolsCurrentLine.length > 0) {
          //console.log("adjacent current line for " + numberObj.val + ": " + hasAdjacentLRSymbol(numberObj.start, numberObj.stop, symbolsCurrentLine));
          isAPartNumber |= hasAdjacentLRSymbol(numberObj.start, numberObj.stop, symbolsCurrentLine);
        }
        if (symbolsNextLine != undefined && symbolsNextLine.length > 0) {
          //console.log("adjacent next line for " + numberObj.val + ": " + hasAdjacentSymbol(numberObj.start, numberObj.stop, symbolsNextLine));
          isAPartNumber |= hasAdjacentSymbol(numberObj.start, numberObj.stop, symbolsNextLine);
        }

        if (isAPartNumber) {
          partNumbers.push(numberObj.val);
          //console.log("partNumberFound: " + numberObj.val);
        }
      });
    }
  });

  return partNumbers;
}

function hasAdjacentSymbol(startPos, stopPos, symbolsIndex) {
  return symbolsIndex.some(symbolIndex => symbolIndex >= startPos-1 && symbolIndex <= stopPos+1);
}

function hasAdjacentLRSymbol(startPos, stopPos, symbolsIndex) {
  return symbolsIndex.some(symbolIndex => symbolIndex == startPos-1 || symbolIndex == stopPos+1);
}

function isSymbol(stringToTest) {
  let stringAsciiCode = stringToTest.charCodeAt(0);
  return !nonSymbolAsciiCodes.includes(stringAsciiCode);
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
  //console.log(symbolsMap);
  //console.log(numbersMap);

  let partNumbersArray = findPartNumbers(symbolsMap, numbersMap);
  result = partNumbersArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  outputResult();
});

//const line = process.argv[2];
