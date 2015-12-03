var fs = require("fs");

/** @data string of LxWxH separated by line breaks **/
var wrappingCalculator = function(data) {

	var total = 0;

	var calculateAllBoxPaperRequirements = function() {
		var boxDimensions = data.split("\r\n");
		//console.log(boxDimensions);
		//return;
		for(var box in boxDimensions) {
			total += calculateBoxWrappingPaper(boxDimensions[box]);
		}
		//console.log("Total: ", total)
	};
	var calculateWrappingPaper = function(l, w, h) {
		var lPaper = l*w,
			wPaper = w*h,
			hPaper = h*l;
		var slack = Math.min(lPaper,wPaper,hPaper);
		return 2*lPaper + 2*wPaper + 2*hPaper + slack;
	};
	var calculateBoxWrappingPaper = function(LxWxH) {
		var lwh = LxWxH.split("x");
		return calculateWrappingPaper(lwh[0], lwh[1], lwh[2])
	};

	return {
		getPaperRequirements : function() {
			calculateAllBoxPaperRequirements();
			return total;
		}
	};

};



fs.readFile("day2.data", "utf8", function(e, data) {
	var calc = new wrappingCalculator(data);
	console.log( "Total:", calc.getPaperRequirements() );
});

/*
Correct Answer: 1606483
*/