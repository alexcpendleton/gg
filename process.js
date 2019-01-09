const fs = require("fs");
const readline = require("readline");
let nouns = [];
let adjectives = [];
// requires the "Part of Speech" database from Kevin's words list http://wordlist.aspell.net/other/
async function processLineByLine() {
  const fileStream = fs.createReadStream("part-of-speech.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (!line.startsWith("G") && !line.startsWith("g")) {
      continue;
    }
    var sections = line.split("\t");
    if (sections.length < 2) {
      continue;
    }
    var word = sections[0];
    var parts = sections[1].split("");
    if (parts.includes("N")) {
      nouns.push(word);
    }
    if (parts.includes("A")) {
      adjectives.push(word);
    }
  }
  var output = {
    adjectives,
    nouns
  };
  //fs.writeFileSync("words-formatted.json", JSON.stringify(output, null, "\t"));
  fs.writeFileSync(
    "words.js",
    ```
// words from Kevin's words list parts of speech database
// thank you! http://wordlist.aspell.net/other/
window.words = ``` + JSON.stringify(output, null, null)
  );
}

processLineByLine();
