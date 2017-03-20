/**
 * 
 */
//var Hashcode = require("./Hashcode.js");
function CompoundHexagon() {
    Hashcode.call(this);
    if (arguments.length === 2) {
        Hexagon.call(this, arguments[0], arguments[1]);
    } else if (arguments.length === 1) {
        Hexagon.call(this, false, arguments[0]);
    } else {
		throw new Error("Invalid # of arguments");
    }
    /** the list of tiles that make up the hex. */
    var hexes  = [];
    /** the number of rotations applied to the {@link Hexagon}. */
    var rotations = 0;
    /**
     * Adds a hexagon.
     * @param hexagon the hexagon
     */
    this.addHex = function(hexagon) {
        if (hexagon !== null) {
            hexes.push(hexagon);
        }
    }
    this.copyOf = function(hex) {
    	Object.getPrototypeOf(Hexagon.prototype).copyOf(hex);
        rotations = hex.rotations;
        hexes = new Hexagon[hex.hexes.length];
        for (var i = 0, len = hexes.length; i < len; i++) {
            var h = new Hexagon(
                    hex.hexes[i].isFlat(), hex.hexes[i].getId(), 
                    hex.hexes[i].getSize());
            h.copyOf(hex.hexes[i]);
            hexes[i] = h;
            h = null;
        }
    }
    /**
     * Gets the center hex for this ascii hex.
     * @return {@link Hexagon}
     */
    this.getCenterHexagon = function() {
        var maxx = 0, minx = 0, maxy = 0, miny = 0, maxz = 0, minz = 0;
        for (var i = hexes.length - 1; i >= 0; i--) {
            maxx = Math.max(maxx, hexes[i].getX());
            minx = Math.min(minx, hexes[i].getX());
            maxy = Math.max(maxy, hexes[i].getY());
            miny = Math.min(miny, hexes[i].getY());
            maxz = Math.max(maxz, hexes[i].getZ());
            minz = Math.min(minz, hexes[i].getZ());
        }
        return this.getHexagon(Math.floor((maxx + minx) / 2), Math.floor((maxy + miny) / 2),
        		Math.floor((maxz + minz) / 2));
    }
    /**
     * Gets the {@link Hexagon} found at a specific index.
     * @return {@link Hexagon}
     */
    this.getHexagon = function() {
    	var hex = null;
    	if (arguments.length === 1) {
    		if (arguments[0] instanceof SimpleVector3) {
                for (var i = hexes.length - 1; i >= 0; i--) {
                    if (hexes[i].equals(arguments[0].getX(), arguments[1].getY(), arguments[2].getZ())) {
                        hex = hexes[i];
                        break;
                    }
                }
    		} else {
    			hex = hexes[arguments[0]];
    		}
    	} else if (arguments.length === 3) {
            for (var i = hexes.length - 1; i >= 0; i--) {
                if (hexes[i].equals(arguments[0], arguments[1], arguments[2])) {
                    hex = hexes[i];
                    break;
                }
            }
    	} else {
    		throw new Error("Invalid # of arguments");
    	}
        return hex;
    }
    /**
     * gets the number of hexes that make up this ascii hex.
     * @return <code>int</code>
     */
    this.getNumberOfHexes = function() {
        return hexes.length;
    }
    /**
     * Gets the number of rotations applied to the hex tile.
     * @return <code>int</code>
     */
    this.getRotations = function() {
        return rotations;
    }
    /**
     * Rotates the hex tile.
     * @throws Exception if an error occurs
     */
    this.rotate = function() {
        for (var i = hexes.length - 1; i >= 0; i--) {
        	hexes[i].rotate();
        }
        rotations++;
        if (rotations > 5) {
        	rotations = 0;
        }
    }
}
