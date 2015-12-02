var fs = require("fs");


var calculateAllBoxPaperRequirements = function(e, data) {
	var boxDimensions = data.split("\r\n"),
		total = 0;
	for(var box in boxDimensions) {
		total += calculateBoxWrappingPaper(boxDimensions[box]);
	}
	console.log("Total: ", total)
}
var calculateWrappingPaper = function(l, w, h) {
	var lPaper = l*w,
		wPaper = w*h,
		hPaper = h*l;
	var slack = Math.min(lPaper,wPaper,hPaper);
	return 2*lPaper + 2*wPaper + 2*hPaper + slack;
}
var calculateBoxWrappingPaper = function(LxWxH) {
	var lwh = LxWxH.split("x");
	return calculateWrappingPaper(lwh[0], lwh[1], lwh[2])
}

fs.readFile("day2.data", "utf8", calculateAllBoxPaperRequirements);

/*
Correct Answer: 1606483
*/