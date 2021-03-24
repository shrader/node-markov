/** Textual markov chain generator */

/* 
You should be able to instantiate it like this:

let mm = new MarkovMachine("the cat in the hat");

Then, whenever you want to get generated text from it:

mm.makeText();

mm.getText(numWords=50);

*/

//read in text
//split text into word object "chains"
//randomly select start word
//use start word as key in obj to find next word
//repeat until you hit null
//return sentence(s)


module.exports = class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    // turn words into object
    this.makeChains(words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(wordsArr) {
    let chain = {}
    for (let index in wordsArr) {
      if (chain[wordsArr[index]]){
        chain[wordsArr[index]].push(wordsArr[parseInt(index) + 1] || null);
      } else {
        chain[wordsArr[index]] = [];
        chain[wordsArr[index]].push(wordsArr[parseInt(index) + 1] || null);
      }
    }
    this.chain = chain;
  }

  chooseRandom(arr) {
   let word = arr[Math.floor(Math.random() * arr.length)]
   return word;
  }
  
  
  /** return random text from chains */
  
  getText(numWords = 100) {
    //get obj keys arr
    let starterWords = Object.keys(this.chain);
    let start = this.chooseRandom(starterWords);
    let wordList = [];
    wordList.push(start);
    while (wordList.length < numWords) {
      let nextWord = this.chooseRandom(this.chain[start])
      if (nextWord === null) {
          console.log('break');
          break;
      } else {
        wordList.push(nextWord);
        start = nextWord;
      }
    }

    return wordList.join(' ');

  }

}  

