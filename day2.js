var fs = require("fs");

/** @data string of LxWxH separated by line breaks **/
var wrappingCalculator = function(data) {

	var paperTotal = 0,
		ribbonTotal = 0;

	var calculateAllBoxRequirements = function() {
		var boxDimensions = data.split("\r\n");
		for(var box in boxDimensions) {
			paperTotal += calculateBoxWrappingPaper(boxDimensions[box]);
			ribbonTotal += calculateBoxRibbon(boxDimensions[box]);
		}
	};
	var calculateBoxWrappingPaper = function(LxWxH) {
		var lwh = LxWxH.split("x");
		return calculateWrappingPaper(lwh[0], lwh[1], lwh[2])
	};
	var calculateBoxRibbon = function(LxWxH) {
		var lwh = LxWxH.split("x");
		return calculateRibbon(lwh[0], lwh[1], lwh[2])
	};
	var calculateWrappingPaper = function(l, w, h) {
		var lPaper = l*w,
			wPaper = w*h,
			hPaper = h*l;
		var slack = Math.min(lPaper,wPaper,hPaper);
		return 2*lPaper + 2*wPaper + 2*hPaper + slack;
	};
	var calculateRibbon = function(l, w, h) {
		var lw = parseInt(l)+parseInt(l)+parseInt(w)+parseInt(w),
			wh = parseInt(w)+parseInt(w)+parseInt(h)+parseInt(h),
			hl = parseInt(h)+parseInt(h)+parseInt(l)+parseInt(l);
		var baseRibbon = Math.min(lw, wh, hl);
		return baseRibbon + l*w*h;
	}


	// Initialized, now start it off
	calculateAllBoxRequirements();


	return {
		getPaperRequirements : function() {
			return paperTotal;
		},
		getRibbonRequirements : function() {
			return ribbonTotal;
		}
	};
};



fs.readFile("day2.data", "utf8", function(e, data) {
	var calc = new wrappingCalculator(data);
	console.log( "Total Wrapping Paper:", calc.getPaperRequirements() );
	console.log( "Total Ribbon:", calc.getRibbonRequirements() );
});

/*
Part 1 Correct Answer: 1606483
Part 2 Correct Answer: 3842356
*/
