import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day7/part1_input.txt";
let cardsRef = new Array("2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A");

function countSameCards(handArray) {
  let maxSameCards = 0;
  for (let i=0 ; i<handArray.length ; i++) {
    let cardCount = handArray.filter(card => card == handArray[i]).length;
    maxSameCards = cardCount > maxSameCards ? cardCount : maxSameCards;
  }

  return maxSameCards;
}

function getSameCard(handArray, instancesCount) {
  let sameCardMap = new Map();
  let sameCard;
  for (let i=0 ; i<handArray.length ; i++) {
    let cardCount = handArray.filter(card => card == handArray[i]).length;
    sameCardMap.set(handArray[i], cardCount);
  }

  sameCardMap.forEach((v, k) => {
    if (v == instancesCount) {
      sameCard = k;
    }
  });

  return sameCard;
}

function isFiveOfAKind(handArray) {
  return countSameCards(handArray) == 5;
}

function isFourOfAKind(handArray) {
  return countSameCards(handArray) == 4;
}

function isFullHouse(handArray) {
  if (countSameCards(handArray) != 3) {
    return false;
  }

  let trioCard = getSameCard(handArray, 3);
  let remains = handArray.filter(card => card != trioCard);

  return countSameCards(remains) == 2;
}

function isThreeOfAKind(handArray) {
  if (countSameCards(handArray) != 3) {
    return false;
  }

  let trioCard = getSameCard(handArray, 3);
  let remains = handArray.filter(card => card != trioCard);

  return countSameCards(remains) == 1;
}

function isTwoPair(handArray) {
  if (countSameCards(handArray) != 2) {
    return false;
  }

  let duoCard = getSameCard(handArray, 2);
  let remains = handArray.filter(card => card != duoCard);
  let duoSecondCard = getSameCard(remains, 2);

  return duoSecondCard != undefined;
}

function isOnePair(handArray) {
  if (countSameCards(handArray) != 2) {
    return false;
  }

  let duoCard = getSameCard(handArray, 2);
  let remains = handArray.filter(card => card != duoCard);

  return countSameCards(remains) == 1;
}

function isHighCard(handArray) {
  return countSameCards(handArray) == 1;
}

function getType(hand) {
  let handArray = Array.from(hand);

  if (isFiveOfAKind(handArray)) {
    return 7;
  } else if (isFourOfAKind(handArray)) {
    return 6;
  } else if (isFullHouse(handArray)) {
    return 5;
  } else if (isThreeOfAKind(handArray)) {
    return 4;
  } else if (isTwoPair(handArray)) {
    return 3;
  } else if (isOnePair(handArray)) {
    return 2;
  } else if (isHighCard(handArray)) {
    return 1;
  } else {
    return -1;
  }
}

function compareStrength(firstHand, secondHand) {
  let firstHandArray = Array.from(firstHand);
  let secondHandArray = Array.from(secondHand);

  for (let i=0; i<firstHandArray.length ; i++) {
    let firstHandStrength = cardsRef.indexOf(firstHandArray[i]);
    let secondHandStrength = cardsRef.indexOf(secondHandArray[i]);

    if (firstHandStrength > secondHandStrength) {
      return 1;
    } else if (firstHandStrength < secondHandStrength) {
      return -1;
    } else if (i==firstHandArray.length-1){
      return 0;
    } else {
      //do nothing
    }
  }
}

// aggregating result

let result = 0;
let hands = new Map();

function addToResult(adding){
  result += adding;
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
  let lineSplit = line.split(" ");
  hands.set(lineSplit[0], Number.parseInt(lineSplit[1]));
});

rl.on('close', () => {
  // console.log(hands);
  let rankedHands = new Map([[1, new Array()],
  [2, new Array()],
  [3, new Array()],
  [4, new Array()],
  [5, new Array()],
  [6, new Array()],
  [7, new Array()]]);

  hands.forEach((v,k) => {
    let typeValue = getType(k);
    let existingRankedHand = rankedHands.get(typeValue);
    let newRankedHand = [k,...existingRankedHand];
    newRankedHand.sort((a,b) => compareStrength(a,b));

    rankedHands.set(typeValue, newRankedHand);
  });

  let rank = 1;
  // console.log(rankedHands);
  rankedHands.forEach((v,k) => {
    v.forEach((hand) => {
      addToResult(hands.get(hand)*rank);
      rank++;
    })
  })

  outputResult();
});

//const line = process.argv[2];
