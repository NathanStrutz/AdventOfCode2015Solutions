var utils = require("./utils");

var fs = require("fs");
var input = fs.readFileSync("day5.data", "utf8");
	input = input.split("\r\n");
// Day 5 data is 16 char strings, all a-z, all lowercase


// Challenge 1

var niceStringCount = 0,
	word = "",
	str = "";

for (str in input) {
	word = input[str];

	if (!word.match(/[aeiou]\w*[aeiou]\w*[aeiou]/) || !word.match(/(\w)\1/g) || word.match(/(ab|cd|pq|xy)/)) {
		continue;
	}

	niceStringCount++;
}

console.log("Challenge 1 Nice Strings: ", niceStringCount);

// Challenge 2

niceStringCount = 0;

for (str in input) {
	word = input[str];

	if ( word.match(/(\w\w)\w*\1/g) && word.match(/(\w)\w\1/g) ) {
		niceStringCount++;
	}

}

console.log("Challenge 2 Nice Strings: ", niceStringCount);


/*
* Day 5 Answer 1: 236
* Day 5 Answer 2: 51
*/
