/** Command-line tool to generate Markov text. */

const fsP = require("fs/promises");
const axios = require("axios");
const mm = require('./markov.js');

/** read file at path and print it out. */

async function cat(path) {
  let content;
  let chains;
  try {
    content = await fsP.readFile(path, "utf8");
    chains = new mm(content);
    console.log(chains.getText());
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

/** read page at URL and print it out. */

async function webCat(url) {
  let resp;
  try {
    resp = await axios({ url });
    chains = new mm(resp.data);
} catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
}
console.log(chains.getText());

}

let path = process.argv[2];

let resultPromise = path.startsWith("http")
    ? webCat(path)
    : cat(path);
