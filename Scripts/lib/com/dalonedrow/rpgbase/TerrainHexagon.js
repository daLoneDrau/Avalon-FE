/**
 * 
 */
//var Hashcode = require("./Hashcode.js");
function TerrainHexagon() {
    Hashcode.call(this);
    if (arguments.length === 2) {
        Hexagon.call(this, arguments[0], arguments[1]);
    } else if (arguments.length === 1) {
        Hexagon.call(this, false, arguments[0]);
    } else {
		throw new Error("Invalid # of arguments");
    }
    /** the hex's clearing id. */
    var clearingId = -1;
    /** the hex's terrain value. */
    var terrain    = null;
    /**
     * Adds a road edge to the terrain.
     * @param side the side the loads leads out
     */
    this.addRoadEdge = function(side) {
        if (side < 0 || side > 5) {
            throw new Error("Invalid edge - " + side);
        }
        if (terrain < TerrainEnum.FOREST) {
            terrain += 1 << side;
        } else {
            terrain = 0;
            terrain += 1 << side;
        }
    }
    this.copyOf = function(hex) {
    	Object.getPrototypeOf(Hexagon.prototype).copyOf(hex);
        clearingId = hex.clearingId;
        terrain = hex.terrain;
    }
    this.getAsciiArt = function() {
    	if (terrain === TerrainEnum.FOREST) {
    		return this.getANSIForest();
    	}
    	return this.getCubeCoordinatesArt();
    }
    this.getANSIForest = function() {
        var sb = [];

        sb.push("<span class=\"dark_green_on_black\">");
	    //sb.append(getANSIDarkGreenOnBlack());
	    sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\");
	    sb.push("</span>\n");
	    //sb.append(getANSICloseSequence());
	
	    //sb.push(getANSIDarkGreenOnBlack());
        sb.push("<span class=\"dark_green_on_black\">");
	    sb.push("&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;/&nbsp;\\");
	    sb.push("</span>\n");
	    //sb.append(getANSICloseSequence());
	
	    //sb.push(getANSIDarkGreenOnBlack());
        sb.push("<span class=\"dark_green_on_black\">");
	    sb.push("&nbsp;&nbsp;/&nbsp;\\");
	    sb.push("</span>");
	    //sb.push(getANSIDarkBrownOnBlack());
        sb.push("<span class=\"dark_brown_on_black\">");
	    sb.push("&nbsp;&nbsp;|&nbsp;");
	    sb.push("</span>\n");
	    //sb.append(getANSICloseSequence());
	
	    //sb.push(getANSIDarkBrownOnBlack());
        sb.push("<span class=\"dark_brown_on_black\">");
	    sb.push("&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;");
	    sb.push("</span>\n");
	    //sb.append(getANSICloseSequence());
	    return sb.join("");
	}
    /**
     * Gets the hex's clearing id. If the hex isn't associated with a clearing,
     * -1 is returned.
     * @return <code>int</code>
     */
    this.getClearingId = function() {
        return clearingId;
    }
    /**
     * Gets the value of the terrain.
     * @return <code>int</code>
     */
    this.getTerrain = function() {
        return terrain;
    }
    this.rotate = function() {
    	Object.getPrototypeOf(Hexagon.prototype).rotate();
        var edges = 0;
        if (terrain >= TerrainEnum.CLEARING
                && terrain < TerrainEnum.FOREST) {
            edges = TerrainEnum.CLEARING;
        }
        if (terrain < TerrainEnum.FOREST) {
            for (var i = 0, len = TerrainEnum.NUM_SIDES; i < len; i++) {
                if ((terrain & 1 << i) == 1 << i) {
                    if (i < TerrainEnum.NUM_SIDES - 1) {
                        edges += 1 << i + 1;
                    } else {
                        edges++;
                    }
                }
            }
            terrain = edges;
        }
    }
    /**
     * Sets the value of the clearing id. -1 means no clearing.
     * @param val the value to set
     */
    this.setClearingId = function(val) {
    	clearingId = val;
    }
    /**
     * Sets the value of the terrain.
     * @param val the value to set
     */
    this.setTerrain = function(val) {
    	terrain = val;
    }
    this.toString = function() {
        var sb = [];
    sb.push("TerrainHexagon");
    sb.push("[id=");
    sb.push(Object.getPrototypeOf(Hexagon.prototype).getId());
    sb.push(", x=");
    sb.push(Object.getPrototypeOf(Hexagon.prototype).getX());
    sb.push(", y=");
    sb.push(Object.getPrototypeOf(Hexagon.prototype).getY());
    sb.push(", z=");
    sb.push(Object.getPrototypeOf(Hexagon.prototype).getZ());
    sb.push(", terrain=");
    sb.push(terrain);
    sb.push(", clearingId=");
    sb.push(clearingId);
    sb.push("]");
    return sb.join("");
}
}
