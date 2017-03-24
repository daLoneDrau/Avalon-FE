/**
 * 
 */
//var Hashcode = require("./Hashcode.js");
function HexTile() {
    Hashcode.call(this);
    /** the set of clearings on the tile. */
    var clearings = [];
    /** the tile's name. */
    var name;
    /**
     * the set of clearings that have roadways running off the edge of the tile.
     */
    var sides = [ -1, -1, -1, -1, -1, -1 ];
    /** the secret site or sound assigned to the tile. */
    var sitesOrSounds = [];
    /** the tile type (Cave, Mountain, Valley, or Woods). */
    var type;
    if (arguments.length === 3) {
    	CompoundHexagon.call(this, arguments[0]);
    	name = arguments[1],
    	type = arguments[2];
    } else {
		throw new Error("Invalid # of arguments");
    }
    /**
     * Adds a clearing to the tile.
     * @param v the clearing's id
     */
    this.addClearing = function(clearing) {
        if (parseInt(clearing) !== parseInt(clearing)) {
            throw new Error("Argument must be Integer")
        }
        clearings.push(clearing);
    }
    /**
     * Determines if the hex contains a specific clearing vertex.
     * @param clearingId the vertex's id
     * @return <tt>true</tt> if the tile contains the vertex, <tt>false</tt>
     *         otherwise
     */
    this.hasClearing = function(clearingId) {
        if (parseInt(clearingId) !== parseInt(clearingId)) {
            throw new Error("Argument must be Integer")
        }
        var found = false;
        for (var i = clearings.length - 1; i >= 0; i--) {
            if (clearings[i] === clearingId) {
                found = true;
                break;
            }
        }
        return found;
    }
    this.setEdgeToClearing = function(side, clearing) {
        if (parseInt(side) !== parseInt(side)
                || parseInt(clearing) !== parseInt(clearing)) {
            throw new Error("Arguments must be Integer")
        }
        sides[side] = clearing;
    }
}