/*jslint node: true, white: true, bitwise: true, continue: true, plusplus: true*/
var utils = require("./utils");

var fs = require("fs");
var input = fs.readFileSync("day7.data", "utf8");

// challenge 2:
input = input.replace(/^.* -> b$/m, "16076 -> b")

	input = input.split("\r\n");

/* Sample data
lf AND lq -> ls			^([a-z]+) AND ([a-z]+) -> ([a-z]+)$
bo OR bu -> bv			^([a-z]+) OR ([a-z]+) -> ([a-z]+)$
iu RSHIFT 1 -> jn		^([a-z]+) RSHIFT (\d+) -> ([a-z]+)$
iu LSHIFT 2 -> jn		^([a-z]+) LSHIFT (\d+) -> ([a-z]+)$
NOT kt -> ku			^NOT ([a-z]+) -> ([a-z]+)$
19138 -> b				^(\d+) -> ([a-z]+)$
1 AND cc -> cd			^(\d+) AND ([a-z]+) -> ([a-z]+)$
lx -> a					^([a-z]+) -> ([a-z]+)$

super regex				^((\d+) -> ([a-z]+)|NOT ([a-z]+) -> ([a-z]+)|([a-z]+) AND ([a-z]+) -> ([a-z]+)|([a-z]+) OR ([a-z]+) -> ([a-z]+)|([a-z]+) RSHIFT (\d+) -> ([a-z]+)|([a-z]+) LSHIFT (\d+) -> ([a-z]+)|(\d+) AND ([a-z]+) -> ([a-z]+)|([a-z]+) -> ([a-z]+))$
*/

// TEST INPUT
// input = "123 -> x|456 -> y|x AND y -> d|x OR y -> e|x LSHIFT 2 -> f|y RSHIFT 2 -> g|NOT x -> h|NOT y -> i".split("|")


// parse loop
var i=0, command="", commands=[], c=null;
for (i=0; i<input.length; i++) {
	command = input[i];

	c = command.match(/^NOT ([a-z]+) -> ([a-z]+)$/);
	if (c) {
		commands.push({
			original: command,
			action: "NOT",
			var1: c[1],
			result: c[2]
		});
	}

	c = command.match(/^([a-z]+) AND ([a-z]+) -> ([a-z]+)$/);
	if (c) {
		commands.push({
			original: command,
			action: "AND",
			var1: c[1],
			var2: c[2],
			result: c[3]
		});
	}

	c = command.match(/^([a-z]+) OR ([a-z]+) -> ([a-z]+)$/);
	if (c) {
		commands.push({
			original: command,
			action: "OR",
			var1: c[1],
			var2: c[2],
			result: c[3]
		});
	}

	c = command.match(/^([a-z]+) LSHIFT (\d+) -> ([a-z]+)$/);
	if (c) {
		commands.push({
			original: command,
			action: "LSHIFT",
			var1: c[1],
			int2: parseInt(c[2]),
			result: c[3]
		});
	}

	c = command.match(/^([a-z]+) RSHIFT (\d+) -> ([a-z]+)$/);
	if (c) {
		commands.push({
			original: command,
			action: "RSHIFT",
			var1: c[1],
			int2: parseInt(c[2]),
			result: c[3]
		});
	}

	c = command.match(/^(\d+) AND ([a-z]+) -> ([a-z]+)$/);
	if (c) {
		commands.push({
			original: command,
			action: "DIGIT-AND",
			int1: parseInt(c[1]),
			var2: c[2],
			result: c[3]
		});
	}

	c = command.match(/^([a-z]+) -> ([a-z]+)$/);
	if (c) {
		commands.push({
			original: command,
			action: "ASSIGNMENT",
			var1: c[1],
			result: c[2]
		});
	}

	c = command.match(/^(\d+) -> ([a-z]+)$/);
	if (c) {
		commands.push({
			original: command,
			action: "NUMBER-ASSIGNMENT",
			int1: parseInt(c[1]),
			result: c[2]
		});
	}
}


// execution loop
var out={}, i=0, safety=0;
while (commands.length) {

	for (i=0; i<commands.length; i++) {
		c = commands[i];
		//console.log(c);
		switch (c.action) {
			case "NOT":
				if (out[ c.var1 ]!==undefined) {
					out[ c.result ] = ~ out[ c.var1 ];
					commands.splice(i,1);i--;
					console.log(c.action, "->", c.original);
				}
			break;

			case "AND":
				if (out[ c.var1 ]!==undefined && out[ c.var2 ]!==undefined) {
					out[ c.result ] = out[ c.var1 ] & out[ c.var2 ];
					commands.splice(i,1);i--;
					console.log(c.action, "->", c.original);
				}
			break;

			case "OR":
				if (out[ c.var1 ]!==undefined && out[ c.var2 ]!==undefined) {
					out[ c.result ] = out[ c.var1 ] | out[ c.var2 ];
					commands.splice(i,1);i--;
					console.log(c.action, "->", c.original);
				}
			break;

			case "LSHIFT":
				if (out[ c.var1 ]!==undefined) {
					out[ c.result ] = out[ c.var1 ] << c.int2;
					commands.splice(i,1);i--;
					console.log(c.action, "->", c.original);
				}
			break;

			case "RSHIFT":
				if (out[ c.var1 ]!==undefined) {
					out[ c.result ] = out[ c.var1 ] >> c.int2;
					commands.splice(i,1);i--;
					console.log(c.action, "->", c.original);
				}
			break;

			case "DIGIT-AND":
				if (out[ c.var2 ]!==undefined) {
					out[ c.result ] = c.int1 & out[ c.var2 ];
					commands.splice(i,1);i--;
					console.log(c.action, "->", c.original);
				}
			break;

			case "ASSIGNMENT":
				if (out[ c.var1 ]!==undefined) {
					out[ c.result ] = out[ c.var1 ];
					commands.splice(i,1);i--;
					console.log(c.action, "->", c.original);
				}
			break;

			case "NUMBER-ASSIGNMENT":
				out[ c.result ] = c.int1;
					commands.splice(i,1);i--;
				console.log(c.action, "->", c.original);
			break;

			default:
				console.log("DEFAULT!", c);
			break;

		}
		// Negative check
		if (out[ c.result ]!=undefined && out[ c.result ] < 0) {
			console.log("Negative check!", c.result, " = ", out[c.result]);
			out[ c.result ] = 65536 + out[ c.result ];
		}

	}


	safety++;
	if (safety>500) {
		// safety variable to keep the loop from going infinite
		break;
	}
}

console.log("----------------------------------------------------------------------");
console.log("Commands to run: ", commands);
console.log("----------------------------------------------------------------------");
console.log("Output: ", out);
