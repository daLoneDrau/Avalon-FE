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
    private void addPhysicalPath(final HexTile hexTile, final String mapFile,
            final String pathId) throws Exception {
        if (hexTile == null) {
            throw new Exception("Hex cannot be null");
        }
        int rotations = hexTile.getRotations();
        if (rotations > 0) {
            // rotate the hex back into its original alignment
            for (int i = six - rotations; i > 0; i--) {
                hexTile.rotate();
            }
        }
        // set the new terrain type for each hex coordinate
        String[] data =
                TextLoader.getInstance().loadText(mapFile, pathId).split("\n");
        SimpleVector3 v0, v1 = null;
        for (int j = 0, len = data.length; j < len; j++) {
            String[] split = data[j].split(" ");
            v0 = v1;
            v1 = new SimpleVector3(Integer.parseInt(split[0]), 
                    Integer.parseInt(split[1]), Integer.parseInt(split[2]));
            if (v0 != null && v1 != null) {
                TerrainHexagon hexagon = 
                        (TerrainHexagon) hexTile.getHexagon(v0);
                if (hexagon != null) {
                    hexagon.addRoadEdge(MagicRealmMap.getInstance()
                            .getPhysicalGrid().getSharedEdge(v0, v1));
                }
                hexagon = (TerrainHexagon) hexTile.getHexagon(v1);
                if (hexagon != null) {
                    hexagon.addRoadEdge(MagicRealmMap.getInstance()
                            .getPhysicalGrid().getSharedEdge(v1, v0));
                }
                hexagon = null;
            }
            split = null;
        }
        // rotate back into game alignment
        for (int i = rotations; i > 0; i--) {
            hexTile.rotate();
        }
        // garbage collection
        data = null;
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
        var tile = new HexTile(nextWorldId++, obj.name, TileEnum[obj.type.code]);
        // add clearings
        for (var j = obj.clearings.length - 1; j >= 0; j--) {
            g.addVertex(new TileClearing(
                    obj.clearings[j].code,                      // clearing name
                    nextVertexId++,                             // clearing id
                    ClearingEnum[obj.clearings[j].type.code])); // clearing type
            tile.addClearing(nextVertexId++);
        }
        // add edges
        for (var j = obj.edges.length - 1; j >= 0; j--) {
            g.addEdge(obj.edges[j].clearing_from.number, obj.edges[j].clearing_to.number);
        }
        // add secret edges
        for (var j = obj.secret_edges.length - 1; j >= 0; j--) {
            addSecretEdge(obj.secret_edges[j].clearing_from.number,
                    obj.secret_edges[j].clearing_to.number);
        }
        // add edges to sides
        for (var j = obj.side_edges.length - 1; j >= 0; j--) {
            tile.setEdgeToClearing(obj.side_edges[j].side, obj.side_edges[j].number);
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
        PooledStringBuilder sb =
                StringBuilderPool.getInstance().getStringBuilder();
        sb.append(new String(hexTile.getName()).toLowerCase());
        sb.append("_maps.txt");
        String[] data =
                TextLoader.getInstance().loadText(sb.toString(), "terrain")
                        .split("\n");
        for (int i = data.length - 1; i >= 0; i--) {
            String[] line = data[i].split(" ");
            if (line.length < max) {
                continue;
            }
            int x = Integer.parseInt(line[0]);
            int y = Integer.parseInt(line[1]);
            int z = Integer.parseInt(line[2]);
            TerrainHexagon hexagon = 
                    (TerrainHexagon) hexTile.getHexagon(x, y, z);
            hexagon.setTerrain(TerrainHexagon.class.getField(line[max - 1])
                    .getInt(null));
            line = null;
            hexagon = null;
        }
        // assign clearings to inner hexagons
        data =
                TextLoader.getInstance()
                        .loadText(sb.toString(), "clearing_hex").split("\n");
        for (int i = data.length - 1; i >= 0; i--) {
            String[] line = data[i].split(" ");
            ((TerrainHexagon) hexTile.getHexagon(Integer.parseInt(line[1]),
                    Integer.parseInt(line[2]), Integer.parseInt(line[max - 1])))
                    .setClearingId(hexTile.getClearing(Integer
                            .parseInt(line[0])));
            System.out.println("clearing "
                    + hexTile.getClearing(Integer.parseInt(line[0]))
                    + " assigned to hex "
                    + hexTile
                            .getHexagon(Integer.parseInt(line[1]), Integer
                                    .parseInt(line[2]), Integer
                                    .parseInt(line[max - 1])));
            line = null;
        }
        // load paths
        data =
                TextLoader.getInstance().loadText(sb.toString(), "paths")
                        .split("\n");
        for (int i = data.length - 1; i >= 0; i--) {
            addPhysicalPath(hexTile, sb.toString(), data[i]);
        }
        // garbage collection
        sb.returnToPool();
        sb = null;
        data = null;
    }
}
