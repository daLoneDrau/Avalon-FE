/**
 * @author drau
 */
function HexSetupUtility() {
    Hashcode.call(this);
    /** the flag indicating whether debug output is turned on. */
    var debug;
    /** the set of digit characters used for number-to-char conversion. */
    var digits = [ '0', '1', '2', '3', '4', '5', '6' ];
    /** the next hexagon id for the overworld map. */
    var nextOverworldId = 0;
    /** the next vertex id. */
    var nextVertexId    = 0;
    /** the set of secret edges to be removed after the map is finalized. */
    var secretEdges = [];
    /** number constants. */
    var three = 3, four = 4, five = 5, six = 6;
    /**
     * Adds a physical path to an hex tile.
     * @param hexTile the ascii hex
     * @param mapFile the map file being loaded
     * @param pathId the name of the path being added
     * @throws Exception if the hex is null, or there is an error loading the
     *             file
     */
    var addPhysicalPath = function(hexTile, edge) {
        if (hexTile === null) {
            throw new Error("Hex cannot be null");
        }
        var rotations = hexTile.getRotations();
        if (rotations > 0) {
            // rotate the hex back into its original alignment
            for (var i = six - rotations; i > 0; i--) {
                hexTile.rotate();
            }
        }
        // set the new terrain type for each hex coordinate
        var v0 = null, v1 = null;
        for (var j = 0, len = edge.path.nodes.length; j < len; j++) {
            var node = edge.path.nodes[j];
            v0 = v1;
            v1 = new SimpleVector3(node.node.x, node.node.y, node.node.z);
            if (v0 !== null && v1 !== null) {
                var hexagon = hexTile.getHexagon(v0);
                if (hexagon !== null) {
                    hexagon.addRoadEdge(MagicRealmMap.getPhysicalGrid().getSharedEdge(v0, v1));
                }
                hexagon = hexTile.getHexagon(v1);
                if (hexagon != null) {
                    hexagon.addRoadEdge(MagicRealmMap.getPhysicalGrid().getSharedEdge(v1, v0));
                }
                hexagon = null;
            }
            node = null;
        }
        // rotate back into game alignment
        for (var i = rotations; i > 0; i--) {
            hexTile.rotate();
        }
        // garbage collection
        v0 = null;
        v1 = null;
    }
    /**
     * Adds edge v-w to the list of secret edges.
     * @param v vertex v
     * @param w vertex w
     */
    var addSecretEdge = function(v, w) {
        if (parseInt(v) !== parseInt(v)
                || parseInt(w) !== parseInt(w)) {
            throw new Error("Arguments must be Integers")
        }
        var found = false;
        for (var i = secretEdges.length - 1; i >= 0; i--) {
            var arr = secretEdges[i];
            if ((arr[0] === v && arr[1] === w) || (arr[1] === v && arr[0] === w)) {
                found = true;
                break;
            }
            arr = null;
        }
        if (!found) {
            secretEdges.push([v, w]);
        }
    }
    /**
     * Loads a hex tile.
     * @param tileName the tile's name
     * @param g the {@link MagicRealmGraph} instance
     * @return {@link HexTile}
     * @throws Exception if there is an error loading the tile's configuration
     *             file
     */
    this.loadHexTile = function(obj, g) {
        var tile = new HexTile(nextOverworldId++, obj.name, TileEnum[obj.type.code]);
        // add clearings
        for (var j = obj.clearings.length - 1; j >= 0; j--) {
            g.addVertex(new TileClearing(
                    obj.clearings[j].code,                      // clearing name
                    nextVertexId,                             // clearing id
                    ClearingEnum[obj.clearings[j].type.code])); // clearing type
            tile.addClearing(nextVertexId++);
        }
        // add edges
        for (var j = obj.edges.length - 1; j >= 0; j--) {
            g.addEdge(tile.getClearing(obj.edges[j].clearing_from.number),
                    tile.getClearing(obj.edges[j].clearing_to.number));
        }
        // add secret edges
        for (var j = obj.secret_edges.length - 1; j >= 0; j--) {
            addSecretEdge(tile.getClearing(obj.secret_edges[j].clearing_from.number),
                    tile.getClearing(obj.secret_edges[j].clearing_to.number));
        }
        // add edges to sides
        for (var j = obj.side_edges.length - 1; j >= 0; j--) {
            tile.setEdgeToClearing(obj.side_edges[j].side,
                    tile.getClearing(obj.side_edges[j].clearing_from.number));
        }
        // load the ascii map
        loadPhysicalMap(tile, obj);
        return tile;
    }
    /**
     * Loads the ASCII map for a hex tile.
     * @param hexTile the {@link HexTile}
     * @throws Exception if there is an error loading the tile's configuration
     *             file
     */
    var loadPhysicalMap = function(hexTile, obj) {
        const max = 4;
        // create inner hexes
        for (var x = -max; x <= max; x++) {
            for (var z = -max; z <= max; z++) {
                if (-x - z < -max) {
                    continue;
                }
                if (-x - z > max) {
                    continue;
                }
                var hexagon = new TerrainHexagon(MagicRealmMap.getPhysicalGrid().getNextId());
                hexagon.setCoordinates(x, z);
                hexTile.addHex(hexagon);
                hexagon = null;
            }
        }
        // load terrain
        for (var j = obj.terrain.length - 1; j >= 0; j--) {
            var terrain = obj.terrain[j];
            var hexagon = hexTile.getHexagon(terrain.location.x, terrain.location.y,
                    terrain.location.z);
            hexagon.setTerrain(TerrainEnum[terrain.type.code]);
            terrain = null;
            hexagon = null;
        }
        // assign clearings to inner hexagons
        for (var j = obj.clearings.length - 1; j >= 0; j--) {
            var clearing = obj.clearings[j];
            var hexagon = hexTile.getHexagon(clearing.location.x, clearing.location.y,
                    clearing.location.z);
            hexagon.setClearingId(hexTile.getClearing(clearing.number));
            clearing = null;
            hexagon = null;            
        }
        // load paths
        for (var j = obj.edges.length - 1; j >= 0; j--) {
            addPhysicalPath(hexTile, obj.edges[j]);
        }
    }
}
