/**
 * @author drau
 */
function MagicRealmGraph() {
    Hashcode.call(this);
    /** the set of hex tiles. */
    var hexTiles = [];
    if (arguments.length === 1
    		&& parseInt(arguments[0]) === parseInt(arguments[0])) {
    	EdgeWeightedUndirectedGraph.call(this, arguments[0]);
    } else if (arguments.length === 1
    		&&  arguments[0] instanceof MagicRealmGraph) {
    	EdgeWeightedUndirectedGraph.call(this, 0);
        for (var i = 0, len = arguments[0].getVertices().length; i < len; i++) {
            this.addVertex(arguments[0].getVertices()[i]);
        }
        for (var i = 0, len = arguments[0].getEdges().length; i < len; i++) {
            this.addEdge(arguments[0].getEdges()[i]);
        }
        for (var i = 0, len = arguments[0].getNumberOfHexTiles(); i < len; i++) {
            this.addHexTile(arguments[0].getHexTile(i));
        }
    } else {
        throw new Error("Invalid # of arguments");
    }
    /**
     * Adds a hex tile to the set.
     * @param hex the hex tile
     * @return true if the tile was successfully added; false otherwise
     */
    this.addHexTile = function(hex) {
        if (!(hex instanceof HexTile)) {
            throw new Error("Only HexTiles can be added");
        }
        var added = false;
        var found = false;
        for (var i = hexTiles.length - 1; i >= 0; i--) {
            if (hex.getName() === hexTiles[i].getName()) {
                found = true;
                break;
            }
        }
        if (!found) {
            hexTiles.push(hex);
            added = true;
        }
        return added;
    }
    /**
     * Gets a specific hex tile by its index.
     * @param index the tile's index
     * @return {@link HexTile}
     * @throws Exception if the index supplied is out of bounds
     */
    this.getHexTile = function(index) {
        return hexTiles[index];
    }
    /**
     * Gets a specific hex tile by its position. If no tile is at the supplied
     * coordinates, null is returned.
     * @return {@link HexTile}
     */
    this.getHexTileAtPosition = function() {
        var x, y, z;
        if (arguments.length === 3
                && parseInt(arguments[0]) === parseInt(arguments[0])
                && parseInt(arguments[1]) === parseInt(arguments[1])
                && parseInt(arguments[2]) === parseInt(arguments[2])) {
            x = arguments[0];
            y = arguments[1];
            z = arguments[2];
        } else if (arguments.length === 1
                && arguments[0] instanceof SimpleVector3) {
            x = arguments[0].getX();
            y = arguments[0].getY();
            z = arguments[0].getZ();
        } else {
            throw new Error("Invalid # of arguments");
        }
        var hex = null;
        for (var i = hexTiles.length - 1; i >= 0; i--) {
            if (hexTiles[i].getVector().equals(x, y, z)) {
                hex = hexTiles[i];
                break;
            }
        }
        return hex;
    }
    /**
     * Gets the hex tile where a clearing is located.
     * @param clearing the clearing id
     * @return {@link HexTile}
     */
    this.getHexTileForClearing = function(clearing) {
        if (parseInt(clearing) !== parseInt(clearing)) {
            throw new Error("Argument must be Integer")
        }
        var hex = null;
        for (var i = hexTiles.length - 1; i >= 0; i--) {
            hex = hexTiles[i];
            if (hex.hasClearing(clearing)) {
                break;
            }
            hex = null;
        }
        return hex;
    }
    /**
     * Gets the number of tiles on the map.
     * @return <code>int</code>
     */
    this.getNumberOfHexTiles = function() {
        return hexTiles.length;
    }
}
