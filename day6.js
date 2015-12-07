var utils = require("./utils");

var fs = require("fs");
var input = fs.readFileSync("day6.data", "utf8"),
	instructions = input.split("\r\n"),
	i=0, j=0, k=0;


// Instructions interpreter
var interpret = function(str) {
	var matches = str.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);
	return {
		action: matches[1],
		startX: matches[2],
		endX: matches[3],
		startY: matches[4],
		endY: matches[5]
	};
};

// Create a grid
var row = [];
for (var i=0; i<1000; i++) {
	row.push(false);
}

var grid = [];
for (i=0; i<1000; i++) {
	grid[i] = Array.from(row);
}


// Now do the work. This is a WIP, doesn't really work or do anything yet...
var task;
for (i in instructions) {
	task = instructions[i];
	//for (j=task.startX-1; j<task.endX)
}
