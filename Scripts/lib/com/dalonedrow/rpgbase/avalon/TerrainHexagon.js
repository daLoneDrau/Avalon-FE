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
        var data = loadTerrainArt();
        if (terrain >= TerrainEnum.CLEARING
                && terrain < TerrainEnum.FOREST) {
        	console.log(this.getVector().toString());
        	console.log("clearing::"+clearing);
            switch (clearing.getType()) {
	            case ClearingEnum.CLEARING_TYPE_CAVE:
	                //data = this.getANSICaveClearing(data, clearing);
	                data = this.getANSICaveClearing(data, clearing);
	                break;
	            default:
	                data = this.getANSIClearing(data, clearing);
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
                data = this.getANSIForest();
                break;
            case TerrainEnum.GRASS:
                data = this.getANSIGrass();
                break;
            case TerrainEnum.GRASS_GREY:
                data = this.getANSIGrassGrey();
                break;
            case TerrainEnum.FOREST_GREY:
                data = this.getANSIForestGrey();
                break;
            case TerrainEnum.FOREST_GOLD:
                data = this.getANSIForestGold();
                break;
            case TerrainEnum.FOREST_PURPLE:
                data = this.getANSIForestPurple();
                break;
            case TerrainEnum.FOREST_GOLD_GREY_PURPLE:
                data = this.getANSIForestGoldGreyPurple();
                break;
            case TerrainEnum.MOUNTAIN:
                data = this.getANSIMountain();
                break;
            case TerrainEnum.RUINS:
                data = this.getANSIRuins();
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
     * Gets clean ANSI art for a woods/mountain clearing.
     * @param text the initial text
     * @param clearing the {@link TileClearing}
     * @return {@link String}
     */
    this.getANSIClearing = function(text, clearing) {
    	console.log(text);
        var data = text;
        var sb = [];
        // remove box on top
        data = data.replace("__\\|__", "  |  ");
        data = data.replace("_____", "     ");
        
        sb.push(TerrainHexagon.GOLDENROD_ON_BLACK);
	    sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	    sb.push("</span>\n");

        sb.push(TerrainHexagon.GOLDENROD_ON_BLACK);
        sb.push('&nbsp;&nbsp;');
	    sb.push("</span>");
        sb.push(TerrainHexagon.BLACK_ON_GOLDENROD);
        sb.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	    sb.push("</span>");
        sb.push(TerrainHexagon.GOLDENROD_ON_BLACK);
        sb.push('&nbsp;&nbsp;');
	    sb.push("</span>\n");

        sb.push(TerrainHexagon.GOLDENROD_ON_BLACK);
        sb.push('&nbsp;&nbsp;');
	    sb.push("</span>");
        sb.push(TerrainHexagon.BLACK_ON_GOLDENROD);
        sb.push('&nbsp;');
        sb.push(clearing.getName());
        sb.push('&nbsp;');
	    sb.push("</span>");
        sb.push(TerrainHexagon.GOLDENROD_ON_BLACK);
        sb.push('&nbsp;&nbsp;');
	    sb.push("</span>\n");

        sb.push(TerrainHexagon.GOLDENROD_ON_BLACK);
        sb.push('&nbsp;');
	    sb.push("</span>");
        sb.push(TerrainHexagon.BLACK_ON_GOLDENROD);
        sb.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	    sb.push("</span>");
        sb.push(TerrainHexagon.GOLDENROD_ON_BLACK);
        sb.push('&nbsp;');
	    sb.push("</span>\n");
        return sb.join("");
    }
    /**
     * Gets clean ANSI art for a woods/mountain clearing.
     * @param text the initial text
     * @param clearing the {@link TileClearing}
     * @return {@link String}
     */
    this.getANSICaveClearing = function(text, clearing) {
    	console.log(text);
        var data = text;
        var sb = [];
        
        sb.push(TerrainHexagon.WHITE_ON_BLACK);
	    sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	    sb.push("</span>\n");

        sb.push(TerrainHexagon.WHITE_ON_BLACK);
        sb.push('&nbsp;&nbsp;_____&nbsp;&nbsp;');
	    sb.push("</span>\n");

        sb.push(TerrainHexagon.WHITE_ON_BLACK);
        sb.push('&nbsp;&nbsp;|');
        sb.push(clearing.getName());
        sb.push('|&nbsp;&nbsp;');
	    sb.push("</span>\n");

        sb.push(TerrainHexagon.WHITE_ON_BLACK);
        sb.push('&nbsp;|___|&nbsp;');
	    sb.push("</span>\n");
        return sb.join("");
    }
    this.getANSIForest = function() {
        var sb = [];

        sb.push(TerrainHexagon.FOREST_GREEN);
	    //sb.append(getANSIDarkGreenOnBlack());
	    sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\");
	    sb.push("</span>\n");
	    //sb.append(getANSICloseSequence());
	
	    //sb.push(getANSIDarkGreenOnBlack());
        sb.push(TerrainHexagon.FOREST_GREEN);
	    sb.push("&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;/&nbsp;\\");
	    sb.push("</span>\n");
	    //sb.append(getANSICloseSequence());
	
	    //sb.push(getANSIDarkGreenOnBlack());
        sb.push(TerrainHexagon.FOREST_GREEN);
	    sb.push("&nbsp;&nbsp;/&nbsp;\\");
	    sb.push("</span>");
	    //sb.push(getANSIDarkBrownOnBlack());
        sb.push(TerrainHexagon.CHOCOLATE);
	    sb.push("&nbsp;&nbsp;|&nbsp;");
	    sb.push("</span>\n");
	    //sb.append(getANSICloseSequence());
	
	    //sb.push(getANSIDarkBrownOnBlack());
        sb.push(TerrainHexagon.CHOCOLATE);
	    sb.push("&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;");
	    sb.push("</span>\n");
	    //sb.append(getANSICloseSequence());
	    return sb.join("");
	}
    /**
     * Gets the ANSI art for the GRASS terrain.
     * @return {@link String}
     */
    this.getANSIGrass = function() {
        var sb = [];

        sb.push(TerrainHexagon.LAWN_GREEN);
        sb.append("&nbsp;.&nbsp;&nbsp;&nbsp;.&nbsp;");
	    sb.push("</span>\n");

        sb.push(TerrainHexagon.LAWN_GREEN);
        sb.append("&nbsp;;&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;");
	    sb.push("</span>\n");

        sb.push(TerrainHexagon.LAWN_GREEN);
        sb.append("&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;.;&nbsp;");
	    sb.push("</span>\n");

        sb.push(TerrainHexagon.LAWN_GREEN);
        sb.append("&nbsp;&nbsp;&nbsp;;&nbsp;.&nbsp;");
	    sb.push("</span>\n");
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
    /**
     * Loads the terrain art from file.
     * @return {@link String}
     * @throws Exception if there is an error loading the art
     */
    var loadTerrainArt = function() {
        var sb = [];
        sb.push("terrain_");
        if (terrain < TerrainEnum.CLEARING) {
            sb.push("ROAD");
            for (var i = 0, len = TerrainEnum.NUM_SIDES; i < len; i++) {
                if ((terrain & 1 << i) == 1 << i) {
                    sb.append('_');
                    sb.append(i);
                }
            }
        } else if (terrain == TerrainEnum.CLEARING) {
            sb.push("CLEARING");
            sb = [];
            sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n");
            sb.push("&nbsp;&nbsp;xxxxx&nbsp;&nbsp;\n");
            sb.push("&nbsp;&nbsp;xx&nbsp;xx&nbsp;&nbsp;\n");
            sb.push("&nbsp;xxxxx&nbsp;\n");
        } else if (terrain > TerrainEnum.CLEARING
                && terrain < TerrainEnum.FOREST) {
            sb.push("CLEARING_ROAD");
            for (var i = 0, len = TerrainEnum.NUM_SIDES; i < len; i++) {
                if ((terrain & 1 << i) == 1 << i) {
                    sb.append('_');
                    sb.append(i);
                }
            }
        }
        console.log(sb.join(""));
        return sb.join("");
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
TerrainHexagon.FOREST_GREEN = "<span class=\"forest_green_on_black\">";
TerrainHexagon.LAWN_GREEN = "<span class=\"lawn_green_on_black\">";
TerrainHexagon.CHOCOLATE = "<span class=\"chocolate_on_black\">";
TerrainHexagon.BLACK_ON_GOLDENROD = "<span class=\"black_on_goldenrod\">";
TerrainHexagon.GOLDENROD_ON_BLACK = "<span class=\"goldenrod_on_black\">";
TerrainHexagon.WHITE_ON_BLACK = "<span class=\"white_on_black\">";
TerrainHexagon.NUM_SIDES = 6;
