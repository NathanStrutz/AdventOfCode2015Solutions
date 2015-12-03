var fs = require("fs");
var input = fs.readFileSync("day3.data", "utf8");

var mysteryMap = function(directions) {
	var grid = {};

	var x=0, y=0;

	var forEachCharacter = function(str, callback) {
		for (i=0; i<str.length; i++) {
			if (callback( str.charAt(i) ) === false) {
				break;
			}
		}
	}

	forEachCharacter(directions, function(whichWay) {
		switch (whichWay) {
			case "^":
				x++;
			break;
			case "v":
				x--;
			break;
			case ">":
				y++;
			break;
			case "<":
				y--;
			break;
		}
		grid[x+"x"+y] = true;
	});


	return {
		countHouses : function(){
			return Object.keys(grid).length
		}
	};
}


var mm = new mysteryMap(input);
console.log("Number of houses: ", mm.countHouses());
