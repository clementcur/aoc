import fs from "fs";
import readline from "readline";

const inputFilePath = "./src/2023/day15/part1_input.txt";

// aggregating result

let results = new Array();
let data = new Array();

function setData(input) {
  data = data.concat(input.split(","));
}

function computeResults() {
  data.forEach(elt => {
    let result = 0;
    for (let i=0; i<elt.length ; i++){
      let charCode = elt.charCodeAt(i);
      result += charCode;
      result *= 17;
      result %= 256;
    }
    results.push(result);
  });
}

// reading file

const fileStream = fs.createReadStream(inputFilePath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  setData(line);
});

rl.on('close', () => {
  computeResults();
  console.log(results.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
});

//const line = process.argv[2];
