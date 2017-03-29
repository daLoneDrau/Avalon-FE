/**
 * 
 */
//var Hashcode = require("./Hashcode.js");
function TerrainHexagon() {
    Hashcode.call(this);
    if (arguments.length === 2
            && parseInt(arguments[0]) === parseInt(arguments[0])
            && parseInt(arguments[1]) === parseInt(arguments[1])) {
        Hexagon.call(this, arguments[0], arguments[1]);
    } else if (arguments.length === 1
            && parseInt(arguments[0]) === parseInt(arguments[0])) {
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
    	console.log("terrain::"+terrain);
        var data = AsciiUtility.loadTerrainArt(terrain);
        if (terrain >= TerrainEnum.CLEARING
                && terrain < TerrainEnum.FOREST) {
        	var clearing = MagicRealmMap.getClearing(clearingId);
            switch (clearing.getType()) {
	            case ClearingEnum.CLEARING_TYPE_CAVE:
	                data = AsciiUtility.getANSICaveClearing(data, clearing);
	                break;
	            default:
	                data = AsciiUtility.getANSIClearing(data, clearing);
	                break;
	        }
        	/*
            console.log("print clearing " + clearingId);
            console.log(this.toString());
            TileClearing clearing =
                    MagicRealmMap.getInstance().getClearing(clearingId);
            System.out.println(clearing);
            HexTile hexTile =
                    MagicRealmMap.getInstance().getHexTileForClearing(
                            clearingId);
            System.out.println(hexTile);
            System.out.println("****\n");
            // set flag indicating the clearing was already redrawn
            boolean redrawn = false;
            */
        }
        switch (terrain) {
            case TerrainEnum.FOREST:
                data = AsciiUtility.getANSIForest();
                break;
            case TerrainEnum.GRASS:
                data = AsciiUtility.getANSIGrass();
                break;
            case TerrainEnum.GRASS_GREY:
                data = AsciiUtility.getANSIGrassGrey();
                break;
            case TerrainEnum.FOREST_GREY:
                data = AsciiUtility.getANSIForestGrey();
                break;
            case TerrainEnum.FOREST_GOLD:
                data = AsciiUtility.getANSIForestGold();
                break;
            case TerrainEnum.FOREST_PURPLE:
                data = AsciiUtility.getANSIForestPurple();
                break;
            case TerrainEnum.FOREST_GOLD_GREY_PURPLE:
                data = AsciiUtility.getANSIForestGoldGreyPurple();
                break;
            case TerrainEnum.MOUNTAIN:
                data = AsciiUtility.getANSIMountain();
                break;
            case TerrainEnum.RUINS:
                data = AsciiUtility.getANSIRuins();
                break;
            default:
                var sb = [];
                var split = data.split("\n");
                for (var i = 0, len = split.length; i < len; i++) {
                    //sb.push(getANSILightBrownOnBlack());
                    //sb.push(split[i]);
                    //sb.push(getANSICloseSequence());
                }
                //data = sb.join("");
                sb = null;
                break;
        }
        return data;
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
    var oldRotate = this.rotate;
    this.rotate = function() {
        oldRotate.call(this);
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
	    sb.push(Object.getPrototypeOf(Hexagon.prototype).getId(this));
	    sb.push(", x=");
	    sb.push(Object.getPrototypeOf(Hexagon.prototype).getX(this));
	    sb.push(", y=");
	    sb.push(Object.getPrototypeOf(Hexagon.prototype).getY(this));
	    sb.push(", z=");
	    sb.push(Object.getPrototypeOf(Hexagon.prototype).getZ(this));
	    sb.push(", terrain=");
	    sb.push(terrain);
	    sb.push(", clearingId=");
	    sb.push(clearingId);
	    sb.push("]");
	    return sb.join("");
	}
}
TerrainHexagon.prototype = Object.create(Hexagon.prototype);
TerrainHexagon.prototype.constructor = TerrainHexagon;
