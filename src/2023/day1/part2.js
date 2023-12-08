import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day1/part2_input.txt";
const digitZeroAsciiCode = 48;
const digitNineAsciiCode = digitZeroAsciiCode + 9;
const digitsAsChars = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9]
]);
//const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function firstDigit(stringToParse) {
  let firstDigit = Array.from(stringToParse.toString()).find(char => char.charCodeAt(0) >= digitZeroAsciiCode && char.charCodeAt(0) <= digitNineAsciiCode);
  let firstDigitIndex = stringToParse.indexOf(firstDigit);

  let firstSpelledDigit = getFirstSpelledDigit(stringToParse);
  let firstSpelledDigitIndex = getIndexOfFirstSpelledDigit(stringToParse);

  if (firstSpelledDigitIndex >= 0) {
    if (firstDigitIndex >= 0) {
      return firstSpelledDigitIndex < firstDigitIndex ? firstSpelledDigit : firstDigit;
    } else {
      return firstSpelledDigit;
    }
  } else if (firstDigitIndex >= 0) {
    return firstDigit;
  } else {
    return -1;
  }
}

function lastDigit(stringToParse) {
  let lastDigit = Array.from(stringToParse.toString()).reverse().find(char => char.charCodeAt(0) >= digitZeroAsciiCode && char.charCodeAt(0) <= digitNineAsciiCode);
  let lastDigitIndex = stringToParse.lastIndexOf(lastDigit);

  let lastSpelledDigit = getLastSpelledDigit(stringToParse);
  let lastSpelledDigitIndex = getIndexOfLastSpelledDigit(stringToParse);

  if (lastSpelledDigitIndex >= 0) {
    if (lastDigitIndex >= 0) {
      return lastSpelledDigitIndex > lastDigitIndex ? lastSpelledDigit : lastDigit;
    } else {
      return lastSpelledDigit;
    }
  } else if (lastDigitIndex >= 0) {
    return lastDigit;
  } else {
    return -1;
  }
}

function getIndexOfFirstSpelledDigit(stringToParse) {
  let minIndex = stringToParse.length-1;

  digitsAsChars.forEach((value, key) => {
    let keyIndex = stringToParse.indexOf(key);
    if(keyIndex != -1 && keyIndex < minIndex) {
      minIndex = keyIndex;
    }
  });

  return minIndex != stringToParse.length-1 ? minIndex : -1;
}

function getFirstSpelledDigit(stringToParse) {
  let minIndex = stringToParse.length-1;
  let firstKey = "";

  digitsAsChars.forEach((value, key) => {
    let keyIndex = stringToParse.indexOf(key);
    if(keyIndex != -1 && keyIndex < minIndex) {
      minIndex = keyIndex;
      firstKey = key;
    }
  });

  return digitsAsChars.get(firstKey);
}

function getIndexOfLastSpelledDigit(stringToParse) {
  let maxIndex = -1;

  digitsAsChars.forEach((value, key) => {
    let keyIndex = stringToParse.lastIndexOf(key);
    if(keyIndex != -1 && keyIndex > maxIndex) {
      maxIndex = keyIndex;
    }
  });

  return maxIndex;
}

function getLastSpelledDigit(stringToParse) {
  let maxIndex = -1;
  let lastKey = "";

  digitsAsChars.forEach((value, key) => {
    let keyIndex = stringToParse.lastIndexOf(key);
    if(keyIndex != -1 && keyIndex > maxIndex) {
      maxIndex = keyIndex;
      lastKey = key;
    }
  });

  return digitsAsChars.get(lastKey);
}

function decodeLine(line) {
  // console.log("firstDigit: " + firstDigit(line));
  // console.log("lastDigit: " + lastDigit(line));
  return "" + firstDigit(line) + lastDigit(line);
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
    addToResult(Number.parseInt(decodeLine(line)));
});

rl.on('close', () => {
    outputResult();
});

//const line = process.argv[2];
