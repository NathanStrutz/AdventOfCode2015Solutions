var fs = require("fs");
var input = fs.readFileSync("day9.data", "utf8");
	//input = "London to Dublin = 464\r\nLondon to Belfast = 518\r\nDublin to Belfast = 141";
	input = input.split(/\r\n/g);


var mappp = function(input) {

	// turn the location input into usable data
	var locations = input.map(function(currentValue, index, array){
		matched = currentValue.match(/^(\w+) to (\w+) = (\d+)$/);
		return {
			city: [matched[1], matched[2]],
			distance: parseInt(matched[3])
		};
	});

	// make a struct of all the basic destinations
	var destinations = [];
	locations.forEach(function(location){
		if (destinations.indexOf(location.city[0]) === -1) {
			destinations.push( location.city[0] );
		}
		if (destinations.indexOf(location.city[1]) === -1) {
			destinations.push( location.city[1] );
		}
	});

	// thank you stack overflow: http://stackoverflow.com/questions/9960908/permutations-in-javascript
	var permutator = function(inputArr) {
		var results = [];

		var permute = function (arr, memo) {
			var cur, memo = memo || [];

			for (var i = 0; i < arr.length; i++) {
				cur = arr.splice(i, 1);
				if (arr.length === 0) {
					results.push(memo.concat(cur));
				}
				permute(arr.slice(), memo.concat(cur));
				arr.splice(i, 0, cur[0]);
			}

			return results;
		}

		return permute(inputArr);
	}
	var permutations = permutator(destinations);



	//console.log("locations:", locations);
	console.log("destinations:", destinations);
	//console.log("permutations:", permutations);

	return {
		getOneDistance: function(city1, city2) {
			for (var i in locations) {
				if (locations[i].city[0]===city1 && locations[i].city[1]===city2 || locations[i].city[0]===city2 && locations[i].city[1]===city1) {
					return locations[i].distance;
				}
			}
		},
		getDistance: function() { // @arguments are cities in the path
			var dist = 0;
			for (var i=0; i<arguments.length; i++) {
				if (i+1 < arguments.length) {
					dist += this.getOneDistance(arguments[i], arguments[i+1]);
					// get location data for each length
					// return the sum of all location data for this path
				}
			}
			return dist;
		},
		getShortestPath: function() {
			var route, i, shortestRoute = 1000000;
			for (i in permutations) {
				route = permutations[i];
				shortestRoute = Math.min(shortestRoute, this.getDistance.apply(this,route));
			}
			return shortestRoute;
		},
		getLongestPath: function() {
			var route, i, longestRoute = 0;
			for (i in permutations) {
				route = permutations[i];
				longestRoute = Math.max(longestRoute, this.getDistance.apply(this,route));
			}
			return longestRoute;
		}
	};
}

var m = new mappp(input);



console.log("-------- Part 1 -------------------------------------------------");
console.log("Shortest Path:", m.getShortestPath());
console.log("-------- Part 2 -------------------------------------------------");
console.log("Longest Path:", m.getLongestPath());
