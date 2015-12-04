/* find five md5 hashes that start with five zeros */
/* the hashes need to start with 'bgvyzdsv' */
/* okay this one would be better in cf */

/* hashString = "abcdef"; should yeild 609043 */

var utils = require("./utils");

var hashString = "bgvyzdsv";
var md5 = new utils.md5();

var loopHash = "";

for (i=1; true; i++) {
	loopHash = md5.hash( hashString + i );
	if (loopHash.substr(0,5)=="00000") {
		console.log("Found Five Zeros! ", loopHash, "Using this ID: ", i);
		break;
	}
}

for (; true; i++) {
	loopHash = md5.hash( hashString + i );
	if (loopHash.substr(0,6)=="000000") {
		console.log("Found Siz Zeros! ", loopHash, "Using this ID: ", i);
		break;
	}
}

/*
* Part 1, correct answer: 254575
* Part 2, correct answer: 1038736
*/