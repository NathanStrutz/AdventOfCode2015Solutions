var utils = require("./utils");

var fs = require("fs");
var input = fs.readFileSync("day3.data", "utf8");

var mysteryMap = function(directions) {
	var grid = {};

	var santaX=0, santaY=0,
		roboX=0, roboY=0;

	var runSantaOnly = function() {
		utils.forEachCharacter(directions, function(iter, whichWay) {
			switch (whichWay) {
				case "^":
					santaX++;
				break;
				case "v":
					santaX--;
				break;
				case ">":
					santaY++;
				break;
				case "<":
					santaY--;
				break;
			}
			grid[santaX+"x"+santaY] = true;
		});
	};
	var runSantaAndRobo = function() {
		utils.forEachCharacter(directions, function(iter, whichWay) {
			if (iter%2==1) {
				// santa route
				switch (whichWay) {
					case "^":
						santaX++;
					break;
					case "v":
						santaX--;
					break;
					case ">":
						santaY++;
					break;
					case "<":
						santaY--;
					break;
				}
				grid[santaX+"x"+santaY] = true;
			} else {
				// robo-santa route
				switch (whichWay) {
					case "^":
						roboX++;
					break;
					case "v":
						roboX--;
					break;
					case ">":
						roboY++;
					break;
					case "<":
						roboY--;
					break;
				}
				grid[roboX+"x"+roboY] = true;
			}
		});
	};

	// Initialized, now run it!
	//runSantaOnly();
	runSantaAndRobo();

	return {
		countHouses : function(){
			return Object.keys(grid).length
		}
	};
}

console.time("day3");
var mm = new mysteryMap(input);
console.log("Number of houses: ", mm.countHouses());
console.timeEnd("day3");

/*
First challenge : 2572
Second challenge: 2631
*/