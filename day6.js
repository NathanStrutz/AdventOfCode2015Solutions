var utils = require("./utils");

var fs = require("fs");
var input = fs.readFileSync("day6.data", "utf8"),
	instructions = input.split("\r\n"),
	i=0, j=0, k=0,
	gridWidth=1000; gridLength=1000;


// Instructions interpreter
var interpret = function(str) {
	var matches = str.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);
	return {
		action: matches[1],
		startX: parseInt(matches[2]),
		endX:  parseInt(matches[3]),
		startY:  parseInt(matches[4]),
		endY:  parseInt(matches[5])
	};
};

// Create a grid
var createGrid = function(x, y, initialValue) {
	var row, grid = [], i=0, j=0;
	for (i=0; i<x; i++) {
		row = [];
		for (var j=0; j<y; j++) {
			row.push(initialValue);
		}
		grid[i] = row;
	}
	return grid;
}

// Test instructions (use with a 10x10 grid)
/*
console.log(grid);
instructions = [
	"turn on 0,0 through 9,9",
	"toggle 1,1 through 2,2"

];
*/

// Challenge 1
grid = createGrid(gridWidth, gridLength, false);
var task;
for (i in instructions) {
	task = interpret(instructions[i]);
	//console.log(task);
	for (j=task.startX; j<task.startY+1; j++) {
		for (k=task.endX; k<task.endY+1; k++) {
			if (task.action==="turn on") {
				//console.log("turning on", j, k);
				grid[j][k] = true;
			} else if (task.action==="turn off") {
				//console.log("turning off", j, k);
				grid[j][k] = false;
			} else if (task.action==="toggle") {
				//console.log("toggling", j, k);
				grid[j][k] = !grid[j][k];
			}
		}
	}
}

// Summarize the on & off lights
var on = 0;
var off = 0;

for (j=0; j<gridWidth; j++) {
	for (k=0; k<gridLength; k++) {
		if (grid[j][k]) {
			on++;
		} else {
			off++;
		}
	}
}

console.log("Challenge 1");
console.log("Total Number On: ", on);
console.log("Total Number Off: ", off);
/*
* Part 1 Answer: 569999
*/
console.log("------------------------------------");

// Challenge 2

grid = createGrid(gridWidth, gridLength, 0);
for (i in instructions) {
	task = interpret(instructions[i]);
	//console.log(task);
	for (j=task.startX; j<task.startY+1; j++) {
		for (k=task.endX; k<task.endY+1; k++) {
			if (task.action==="turn on") {
				grid[j][k]++;
			} else if (task.action==="turn off") {
				//console.log("turning off", j, k);
				if (grid[j][k]>0) { grid[j][k]--; }
			} else if (task.action==="toggle") {
				//console.log("toggling", j, k);
				grid[j][k] += 2;
			}
		}
	}
}

// Summarize brightness
var brightness = 0;

for (j=0; j<gridWidth; j++) {
	for (k=0; k<gridLength; k++) {
		brightness += grid[j][k];
	}
}

console.log("Brightness: ", brightness);
/*
* Part 2 answer: 17836115
*/