var MagicRealmMap = (function () {
    /** the hexagonal grid for the overworld map. */
    var overworldGrid = new HexCoordinateSystem(HexCoordinateSystem.EVEN_Q);
    /** the hexagonal grid for the physical map. */
    var physicalGrid = new HexCoordinateSystem(HexCoordinateSystem.EVEN_Q);
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
 
    return {
        getOverworldGrid: getOverworldGrid,
        getPhysicalGrid: getPhysicalGrid
    };
})();
 
function run() {
 
    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();
 
    alert("Same instance? " + (instance1 === instance2));  
}