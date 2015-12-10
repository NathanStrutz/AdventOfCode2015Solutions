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


	console.log(locations);
	console.log(destinations);

	return {
		getOneDistance: function(city1, city2) {
			for (var i in locations) {
				if (locations[i].city[0]===city1 && locations[i].city[1]===city2 || locations[i].city[0]===city2 && locations[i].city[1]===city1) {
					return locations[i].distance;
				}
			}
		},
		getDistance: function() {
			for (var i in arguments) {
				if (i+1 < arguments.length) {
					// get location data for each length
					// return the sum of all location data for this path
				}
			}
		},
		getShortestPath: function() {

			// Use all the destinations to create all the paths, then sum them up

		}
	};
}

var m = new mappp(input);



console.log(m.getDistance("Dublin","Belfast"));
console.log(m.getDistance("Dublin","London"));

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

