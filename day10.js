/*jslint node: true*/
var utils = require("./utils");
var input = "1113222113";


// for each character group
var forEachCharacterGroup = function(str, callback){
	var charIndex = 0;
	var endOfSequenceIndex = 0;
	while (charIndex < str.length) {
		while (endOfSequenceIndex < str.length
				&&
				str.charAt(charIndex) === str.charAt(endOfSequenceIndex)) {
			endOfSequenceIndex++;
		}

		if (callback( str.slice(charIndex, endOfSequenceIndex) ) === false) {
			break;
		}

		charIndex = endOfSequenceIndex;
	}
}


var lookAndSay = function(str) {
	var newString = "";
	forEachCharacterGroup(str, function(charGroup) {
		newString += charGroup.length;
		newString += charGroup.charAt(0);
	});
	return newString;
}

console.log(lookAndSay(input));

for (var i=0; i<50; i++) {
	input = lookAndSay(input);
	console.log(i, " : ", input.length );
}