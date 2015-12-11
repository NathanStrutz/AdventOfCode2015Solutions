/*jslint node: true, forin: true*/
var utils = require("./utils");

var fs = require("fs");
var input = fs.readFileSync("day8.data", "utf8");
//var input = fs.readFileSync("day8.test.data", "utf8");
input = input.split("\r\n");


console.log("-------- Part 1 ------------------------------------------------------");
var originalSize = 0, finishedSize = 0, i = 0, line;

for (i in input) {
	line = input[i];
	originalSize += line.length;

	line = line.replace(/^"/gm, "").replace(/"$/gm, "");	// Quotes
	line = line.replace(/\\\\/g, "S");						// double-slashes
	line = line.replace(/\\x[0-9a-f]{2}/g, "C");		// character code
	line = line.replace(/\\"/g, "Q");						// quote

	//console.log(line);
	finishedSize += line.length;
}
console.log("Original Size: ", originalSize);
console.log("Finished Size: ", finishedSize);
console.log("Difference   : ", originalSize - finishedSize);

console.log("-------- Part 2 ------------------------------------------------------");

originalSize = 0;
finishedSize = 0;

for (i in input) {
	line = input[i];
	originalSize += line.length;

	line = line.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

	finishedSize += line.length + 2; // plus 2 for the new edge quotes
}
console.log("Original Size: ", originalSize);
console.log("Finished Size: ", finishedSize);
console.log("Difference   : ", finishedSize - originalSize);
