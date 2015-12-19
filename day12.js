/*jslint node: true, white: true, forin: true, plusplus: true, sloppy: true*/
var fs = require("fs");
var input = fs.readFileSync("day12.data", "utf8");
var input = JSON.parse( input );


console.log("-------- Part 1 ------------------------------------------------------");
var sum = 0;
var addEverything = function(data) {
	var recursePlease = function() {
		var i;
		for (i in data) {
			addEverything(data[i]);
		}
	};

	switch (typeof data) {
		case "number":
			sum += data;
		break;
		case "string":
			// do nothing
		break;
		case "array": case "object":
			recursePlease();
		break;
		default:
			console.log("Oh no, unknown data type", typeof data, data);
	}

};

addEverything(input);
console.log( sum );

console.log("-------- Part 2 ------------------------------------------------------");
sum = 0;
var addEverythingNotRed = function(data) {
	var recursePlease = function() {
		var i;
		for (i in data) {
			addEverythingNotRed(data[i]);
		}
	},
	hasRed = function() {
		var i;
		for (i in data) {
			if (data[i] === "red") {
				return true;
			}
		}
		return false;
	};

	switch (typeof data) {
		case "number":
			sum += data;
		break;
		case "string":
			// do nothing
		break;
		case "array":
			recursePlease();
		break;
		case "object":
			if (Array.isArray(data)) {
				recursePlease();
			} else if (!hasRed()) {
				recursePlease();
			}
		break;
		default:
			console.log("Oh no, unknown data type", typeof data, data);
	}

};

addEverythingNotRed(input);
console.log( sum );
