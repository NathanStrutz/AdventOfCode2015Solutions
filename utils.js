module.exports = {

	forEachCharacter : function(str, callback) {
		for (i=0; i<str.length; i++) {
			if (callback( i, str.charAt(i) ) === false) {
				break;
			}
		}
	}

};