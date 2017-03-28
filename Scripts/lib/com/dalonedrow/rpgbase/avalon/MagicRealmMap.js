var MagicRealmMap = (function () {
    /** the map. */
    var g;
    /** the hexagonal grid for the overworld map. */
    var overworldGrid = new HexCoordinateSystem(HexCoordinateSystem.EVEN_Q);
    /** the hexagonal grid for the physical map. */
    var physicalGrid = new HexCoordinateSystem(HexCoordinateSystem.EVEN_Q);
    /**
     * Gets the {@link TileClearing} instance associated with a specific id.
     * @param clearingId the clearing's id
     * @return {@link TileClearing}
     */
    var getClearing = function(clearingId) {
        return g.getVertex(clearingId);
    }
    /**
     * Gets the graph instance used.
     * @return {@link MagicRealmGraph}
     */
    var getGraph = function() {
        return g;
    }
    /**
     * Gets the hexagonal grid for the overworld map.
     * @return {@link HexCoordinateSystem}
     */
    var getOverworldGrid = function() {
        return overworldGrid;
    }
    /**
     * Gets the hexagonal grid for the physical map.
     * @return {@link HexCoordinateSystem}
     */
    var getPhysicalGrid = function() {
        return physicalGrid;
    }
    /**
     * Gets the hexagonal grid for the physical map.
     * @return {@link HexCoordinateSystem}
     */
    var getPhysicalGrid = function() {
        return physicalGrid;
    }
    /**
     * Sets the graph instance used.
     * @param val the {@link MagicRealmGraph} instance
     */
    var setGraph = function(val) {
        g = val;
    } 
    return {
        getClearing: getClearing,
        getGraph: getGraph,
        getOverworldGrid: getOverworldGrid,
        getPhysicalGrid: getPhysicalGrid,
        setGraph: setGraph
    };
})();