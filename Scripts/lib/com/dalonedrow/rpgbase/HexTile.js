/**
 * 
 */
//var Hashcode = require("./Hashcode.js");
function HexTile() {
    Hashcode.call(this);
    if (arguments.length === 3) {
    	CompoundHexagon.call(this, arguments[0]);
    	name = arguments[1],
    	type = arguments[2];
    } else {
		throw new Error("Invalid # of arguments");
    }
    var clearings = [];
    var name, type, sides;
    this.addClearing = function(clearing) {
    	if (clearing instanceof TileClearing) {
    		var found = false;
	    	for (var i = clearings.length - 1; i >= 0; i--) {
	    		if (clearings[i].equals(clearing)) {
	    			found = true;
	    			break;
	    		}
	    	}
	    	if (!found) {
	    		clearings.push(clearing);
	    	}
    	}
    }
    this.getClearing = function() {
    	var clearing = null;
    	if (arguments.length === 1) {
	    	for (var i = clearings.length - 1; i >= 0; i--) {
	    		if (parseInt(arguments[0]) === parseInt(arguments[0])
	    				&& clearings[i].getId() === arguments[0]) {
	    			// get by id
	    			clearing = clearings[i];
	    			break;
	    		} else if (clearings[i].getName() === arguments[0]) {
	    			// get by name
	    			clearing = clearings[i];
	    			break;
	    		}
	    	}
    	} else {
    		throw new Error("Invalid # of arguments");
        }
    	return clearing;
    }
}