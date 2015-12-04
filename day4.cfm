<cfscript>/* find five md5 hashes that start with five zeros */
/* the hashes need to start with 'bgvyzdsv' */
/* okay this one would be better in cf */

/* hashString = "abcdef"; should yeild 609043 */

hashString = "bgvyzdsv";

startTime = getTickCount();

loopHash = "";
i = 0;

while (true) {
	i++;
	loopHash = hash( hashString & i );
	if (compare(left(loopHash, 5),"00000") EQ 0) {
		writeOutput("Found Five Zeros! " & loopHash & " using this ID: " & i);
		break;
	}
}
writeOutput("<br>");

while (true) {
	i++;
	loopHash = hash( hashString & i );
	if (compare(left(loopHash, 6),"000000") EQ 0) {
		writeOutput("Found Six Zeros! " & loopHash & " using this ID: " & i);
		break;
	}
}

writeOutput("<br>");
writeOutput("Timer: " & getTickCount() - startTime & "ms");

/*
* Part 1, correct answer: 254575
* Part 2, correct answer: 1038736
*/
</cfscript>