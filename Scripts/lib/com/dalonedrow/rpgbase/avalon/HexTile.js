/**
 * 
 */
//var Hashcode = require("./Hashcode.js");
function HexTile() {
    Hashcode.call(this);
    /** the set of clearings on the tile. */
    var clearings = [];
    /**
     * a multi-dimensional array containing the reference ids for all parties
     * that discovered the tile's sites or sounds.
     */
    var partySiteOrSound;
    /**
     * an array containing the reference ids for all parties that discovered the
     * tile warning.
     */
    var partyWarnings;
    /**
     * the set of clearings that have roadways running off the edge of the tile.
     */
    var sides = [ -1, -1, -1, -1, -1, -1 ];
    /** the secret site or sound assigned to the tile. */
    var sitesOrSounds = [];
    /** the tile's name. */
    var tileName;
    /** the tile type (Cave, Mountain, Valley, or Woods). */
    var type;
    /** the secret warning assigned to the tile. */
    var warning;
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
     * Adds a secret site or sound assigned to the tile.
     * @param val the value to add
     */
    this.addSiteOrSound = function(val) {
        if (parseInt(val) !== parseInt(val)) {
            throw new Error("Argument must be Integer")
        }
        var found = false;
        for (var i = sitesOrSounds.length - 1; i >= 0; i--) {
            if (sitesOrSounds[i] === val) {
                found = true;
                break;
            }
        }
        if (!found) {
            sitesOrSounds.push(val);
        }
    }
    this.equals = function(obj) {
        var equals = false;
        if (obj instanceof HexTile
                && tileName === obj.getName()) {
            equals = true;
        }
        return equals;
    }
    /**
     * Gets the vertex id representing a specific clearing.
     * @param number the clearing's assigned number
     * @return <code>int</code>
     * @throws Exception if an error occurs
     */
    this.getClearing = function(number) {
        if (parseInt(number) !== parseInt(number)) {
            throw new Error("Argument must be Integer")
        }
        var hexNodeLen = clearings.length, max = 1000;
        var min = max, clearingId = -1;
        for (var i = hexNodeLen - 1; i >= 0; i--) {
            min = Math.min(clearings[i], min);
        }
        switch (hexNodeLen) {
            case 6: // the hex has six clearings, each numbered 1-6
                clearingId = min + number - 1;
                break;
            case 4: // the hex has four clearings, numbered 1-2, 4-5
                if (number < three) {
                    clearingId = min + number - 1;
                } else if (number > three && number < six) {
                    clearingId = min + number - 2;
                }
                break;
            case 3: // the hex has three clearings, numbered 2, 4-5
                if (number == 2) {
                    clearingId = min;
                } else if (number > three && number < six) {
                    clearingId = min + number - three;
                }
                break;
            default:
                throw new Error(["Invalid number of clearings in the hex - ", hexNodeLen].join(""));
        }
        return clearingId;
    }
    /**
     * Gets the vertex id of a clearing that leads out of a specific side.
     * @param side the side (0-5)
     * @return <code>int</code>
     */
    this.getClearingForSide = function(side) {
        if (parseInt(side) !== parseInt(side)) {
            throw new Error("Argument must be Integer")
        }
        return sides[side];
    }
    /**
     * Gets the id.
     * @return <code>char</code>[]
     */
    this.getName = function() {
        return tileName;
    }
    /**
     * Gets the number of sites or sounds assigned to the tile.
     * @return <code>int</code>
     */
    this.getNumberOfSitesOrSounds = function() {
        return sitesOrSounds.length;
    }
    /**
     * Gets the secret site or sound assigned to the tile.
     * @param index the array index
     * @return <code>int</code>
     */
    this.getSiteOrSound = function(index) {
        if (parseInt(index) !== parseInt(index)) {
            throw new Error("Argument must be Integer")
        }
        return sitesOrSounds[index];
    }
    /**
     * Gets the tile type (Cave, Mountain, Valley, or Woods).
     * @return <code>int</code>
     */
    this.getType = function() {
        return type;
    }
    /**
     * Gets the secret warning assigned to the tile.
     * @return <code>int</code>
     */
    this.getWarning = function() {
        return warning;
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
    /**
     * Rotates the hex.
     * @throws Exception
     */
    this.rotate = function() {
        // save the first value erased
        var savedVal = sides[sides.length - 1];
        for (var i = sides.length - 1; i > 0; i--) {
            sides[i] = sides[i - 1];
        }
        sides[0] = savedVal;
        Object.getPrototypeOf(CompoundHexagon.prototype).rotate(this);
    }
    this.setEdgeToClearing = function(side, clearing) {
        if (parseInt(side) !== parseInt(side)
                || parseInt(clearing) !== parseInt(clearing)) {
            throw new Error("Arguments must be Integer")
        }
        sides[side] = clearing;
    }
}