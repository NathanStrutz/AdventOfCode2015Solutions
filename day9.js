//var fs = require("fs");
//var input = fs.readFileSync("day9.data", "utf8");
//	input = input.split("\r\n");


input = "London to Dublin = 464\r\nLondon to Belfast = 518\r\nDublin to Belfast = 141";
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

	// what if we also reversed the location input data to make sure 1->2 is the same as 2->1 ?

	var allPaths = [];
	var getAllPaths = function() {
		var i,city;

		var pathExists = function(path) {
			var i,path,o;
			for (i in allPaths) {
				path = allPaths[i];
				for (o in arguments) {
					if (path[o] !== arguments[o]) {
						// No match
						continue;
					}
				}
				// This one must be a match!
				return true;
			}
			// wasn't found
			return false;
		};


		for (var i in destinations) {
			city = destinations[i];

		}
	};

	console.log("locations:", locations);
	console.log("destinations:", destinations);

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
					console.log(arguments[i]);
					dist += this.getOneDistance(arguments[i], arguments[i+1]);
					// get location data for each length
					// return the sum of all location data for this path
				}
			}
			return dist;
		},
		getShortestPath: function() {

			// Use all the destinations to create all the paths, then sum them up

		}
	};
}

var m = new mappp(input);



console.log("-------- Outside ... -------------------------------------------------");
console.log("Distance from Dublin to Belfast:", m.getDistance("Dublin","Belfast"));
console.log("Distance from Dublin to London:", m.getDistance("Dublin","London"));
console.log("Distance from D to B to L:", m.getDistance("Dublin","Belfast","London"));

/*

The possible routes are therefore:

Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982
The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this example.
*/

//fun.apply(this,[1,2,3])