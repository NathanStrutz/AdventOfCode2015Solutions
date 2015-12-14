var fs = require("fs"),
	input = fs.readFileSync("day14.data").toString();

var Race = function(input) {

	var reindeer = {},
		raceLength = 2503;

	var init = function(input) {
		// input is like this:
		// Vixen can fly 18 km/s for 5 seconds, but then must rest for 84 seconds.
		var lines = input.split(/\r\n/g);
		var matches, i;
		for (i in lines) {
			matches = lines[i].match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
			reindeer[ matches[1] ] = {
				// here's the data fields from the file
				speed: parseInt(matches[2]),
				sprint: parseInt(matches[3]),
				rest: parseInt(matches[4]),
				// here's the game fields I'm simulating
				moving: true,
				activityTime: 0,
				distance: 0,
				points: 0
			};
		}
		//console.log("Start: ", reindeer);
	}(input);

	return {
		run: function() {
			var i, d, deer, leaderDistance=0;
			for (i=0; i<raceLength; i++) { // the race/each-second loop
				for (d in reindeer) {
					deer = reindeer[d];
					if (deer.moving) {
						// moving
						deer.distance += deer.speed;
						deer.activityTime++;
						if (deer.activityTime === deer.sprint) {
							deer.moving = false;
							deer.activityTime = 0;
						}
					} else {
						// resting
						deer.activityTime++;
						if (deer.activityTime === deer.rest) {
							deer.moving = true;
							deer.activityTime = 0;
						}
					}
					leaderDistance = Math.max(leaderDistance, deer.distance);
				}
				// Second deer loop to award points to the fastest deer
				for (d in reindeer) {
					deer = reindeer[d];
					if (deer.distance === leaderDistance) {
						deer.points++;
					}
				}
			}
			console.log("Finish: ", reindeer);
		}
	}

}

var race = new Race(input);
race.run();
