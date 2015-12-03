var utils = require("./utils");

var fs = require("fs");
var input = fs.readFileSync("day1.data", "utf8");


var result = eval( input.replace(/\(/g, "+1").replace(/\)/g, "-1") );
console.log( result );


var mysteryMap = function(directions) {
	var basementPosition = 0, x=0;

	utils.forEachCharacter(directions, function(iteration, whichWay) {
		switch (whichWay) {
			case "(":
				x++;
			break;
			case ")":
				x--;
			break;
		}
		if (basementPosition===0 && x === -1) {
			basementPosition = iteration +1;
			// Plus one because apparently we're talking about human positions
			// instead of javascript positions. Right. This is language agnostic
		}
	});


	return {
		getFloor : function(){
			return x;
		},
		getBasementPosition : function() {
			return basementPosition;
		}
	};
}

var mm = mysteryMap(input);
console.log("Final Floor: ", mm.getFloor());
console.log("Basement Position: ", mm.getBasementPosition());

// first basementposition was 1796, which was too low