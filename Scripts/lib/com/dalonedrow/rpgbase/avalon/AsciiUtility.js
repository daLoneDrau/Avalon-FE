var AsciiUtility = (function () {
    /**
     * Gets clean ANSI art for a woods/mountain clearing.
     * @param text the initial text
     * @param clearing the {@link TileClearing}
     * @return {@link String}
     */
    var getANSIClearing = function(text, clearing) {
        var data = text;
        var sb = [];
        // remove box on top
        data = data.replace("__|__",
                [AsciiUtility.GOLDENROD_ON_BLACK, "&nbsp;&nbsp;|&nbsp;&nbsp;</span>"].join(""));
        data = data.replace("__\\__",
                [AsciiUtility.GOLDENROD_ON_BLACK, "&nbsp;&nbsp;\\&nbsp;&nbsp;</span>"].join(""));
        data = data.replace("_____",
                [AsciiUtility.GOLDENROD_ON_BLACK, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"].join(""));
        
        sb.push(AsciiUtility.BLACK_ON_GOLDENROD);
        sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        sb.push("</span>");
        data = data.replace(/xxxxx/g, sb.join(""));
        
        sb = [];
        sb.push(AsciiUtility.BLACK_ON_GOLDENROD);
        sb.push("&nbsp;");
        sb.push(clearing.getName());
        sb.push("&nbsp;");
        sb.push("</span>");
        data = data.replace(/xx&nbsp;xx/, sb.join(""));
        return data;
    }
    /**
     * Gets clean ANSI art for a woods/mountain clearing.
     * @param text the initial text
     * @param clearing the {@link TileClearing}
     * @return {@link String}
     */
    var getANSICaveClearing = function(text, clearing) {
        var data = text;
        // fix box on top
        data = data.replace("__|__",
                [AsciiUtility.WHITE_ON_BLACK, "__</span>",
                    AsciiUtility.GOLDENROD_ON_BLACK, "|</span>",
                    AsciiUtility.WHITE_ON_BLACK, "__</span>"].join(""));
        data = data.replace("__\\__",
                [AsciiUtility.WHITE_ON_BLACK, "__</span>",
                    AsciiUtility.GOLDENROD_ON_BLACK, "\\</span>",
                    AsciiUtility.WHITE_ON_BLACK, "__</span>"].join(""));
        data = data.replace("_____",
                [AsciiUtility.WHITE_ON_BLACK, "_____</span>"].join(""));

        var sb = [];
        sb.push(AsciiUtility.WHITE_ON_BLACKEST);
        sb.push("|&nbsp;&nbsp;&nbsp;|");
        sb.push("</span>");
        data = data.replace(/xxxxx/, sb.join(""));
        
        sb = [];
        sb.push(AsciiUtility.WHITE_ON_BLACKEST);
        sb.push("|");
        sb.push(clearing.getName());
        sb.push("|");
        sb.push("</span>");
        data = data.replace(/xx&nbsp;xx/, sb.join(""));

        sb = [];
        sb.push(AsciiUtility.WHITE_ON_BLACKEST);
        sb.push("|___|");
        sb.push("</span>");
        data = data.replace(/xxxxx/, sb.join(""));
        
        return data;
    }
    var getANSIForest = function() {
        var sb = [];
        sb.push(AsciiUtility.FOREST_GREEN);
        sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\");
        sb.push("</span>\n");
        
        sb.push(AsciiUtility.FOREST_GREEN);
        sb.push("&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;/&nbsp;\\");
        sb.push("</span>\n");
        
        sb.push(AsciiUtility.FOREST_GREEN);
        sb.push("&nbsp;&nbsp;/&nbsp;\\");
        sb.push("</span>");
        sb.push(AsciiUtility.CHOCOLATE);
        sb.push("&nbsp;&nbsp;|&nbsp;");
        sb.push("</span>\n");
        
        sb.push(AsciiUtility.CHOCOLATE);
        sb.push("&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;");
        sb.push("</span>\n");
        return sb.join("");
    }
    /**
     * Gets the ANSI art for the GRASS terrain.
     * @return {@link String}
     */
    var getANSIGrass = function() {
        var sb = [];

        sb.push(AsciiUtility.LAWN_GREEN);
        sb.append("&nbsp;.&nbsp;&nbsp;&nbsp;.&nbsp;");
        sb.push("</span>\n");

        sb.push(AsciiUtility.LAWN_GREEN);
        sb.append("&nbsp;;&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;");
        sb.push("</span>\n");

        sb.push(AsciiUtility.LAWN_GREEN);
        sb.append("&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;.;&nbsp;");
        sb.push("</span>\n");

        sb.push(AsciiUtility.LAWN_GREEN);
        sb.append("&nbsp;&nbsp;&nbsp;;&nbsp;.&nbsp;");
        sb.push("</span>\n");
        return sb.join("");
    }
    /**
     * Loads the terrain art from file.
     * @return {@link String}
     * @throws Exception if there is an error loading the art
     */
    var loadTerrainArt = function(terrain) {
        var sb = [];
        sb.push("terrain_");
        if (terrain < TerrainEnum.CLEARING) {
            sb.push("ROAD");
            for (var i = 0, len = TerrainEnum.NUM_SIDES; i < len; i++) {
                if ((terrain & 1 << i) == 1 << i) {
                    sb.push('_');
                    sb.push(i);
                }
            }
            if (sb.join("") === "terrain_ROAD_0_1") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;|___/");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_0_1_2_4") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;__|&nbsp;&nbsp;&nbsp;/");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_0_1_3_5") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;\\__|___/");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_0_3") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_0_4") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;__|&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_0_5") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;\\__|&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_1_4") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;______/");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_1_5") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;\\__|___/");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_2_4") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;______&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_2_5") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;\\______&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_ROAD_3_5") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;\\__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;");
                sb.push("</span>\n");
            } else {
                console.log(sb.join(""));
            }
        } else if (terrain == TerrainEnum.CLEARING) {
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
                    sb.push('_');
                    sb.push(i);
                }
            }
            if (sb.join("") === "terrain_CLEARING_ROAD_0") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("__|__");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xx&nbsp;xx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_CLEARING_ROAD_0_1_3") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("__|__");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("_/");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xx&nbsp;xx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_CLEARING_ROAD_1") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("_____");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("_/");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xx&nbsp;xx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_CLEARING_ROAD_1_2_4") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("_____");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("_/");
                sb.push("</span>\n");

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;_");
                sb.push("</span>");
                sb.push("xx&nbsp;xx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("__");
                sb.push("</span>\n");                

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_CLEARING_ROAD_2") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("_____");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xx&nbsp;xx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("__");
                sb.push("</span>\n");                

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_CLEARING_ROAD_2_3_4") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("_____");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;_");
                sb.push("</span>");
                sb.push("xx&nbsp;xx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("__");
                sb.push("</span>\n");                

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_CLEARING_ROAD_3") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("_____");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xx&nbsp;xx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_CLEARING_ROAD_3_4_5") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("_____");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;\\");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;_");
                sb.push("</span>");
                sb.push("xx&nbsp;xx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");                

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
            } else if (sb.join("") === "terrain_CLEARING_ROAD_4") {
                sb = [];
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("_____");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
                
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;_");
                sb.push("</span>");
                sb.push("xx&nbsp;xx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;&nbsp;");
                sb.push("</span>\n");                

                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>");
                sb.push("xxxxx");
                sb.push(AsciiUtility.GOLDENROD_ON_BLACK);
                sb.push("&nbsp;");
                sb.push("</span>\n");
            } else {
                console.log(sb.join(""));
            }
        }
        return sb.join("");
    }
    return {
        getANSIClearing: getANSIClearing,
        getANSICaveClearing: getANSICaveClearing,
        getANSIForest: getANSIForest,
        getANSIGrass: getANSIGrass,
        loadTerrainArt: loadTerrainArt
    };
})();
AsciiUtility.FOREST_GREEN = "<span class=\"forest_green_on_black\">";
AsciiUtility.LAWN_GREEN = "<span class=\"lawn_green_on_black\">";
AsciiUtility.CHOCOLATE = "<span class=\"chocolate_on_black\">";
AsciiUtility.BLACK_ON_GOLDENROD = "<span class=\"black_on_goldenrod\">";
AsciiUtility.GOLDENROD_ON_BLACK = "<span class=\"goldenrod_on_black\">";
AsciiUtility.WHITE_ON_BLACK = "<span class=\"white_on_black\">";
AsciiUtility.WHITE_ON_BLACKEST = "<span class=\"white_on_blackest\">";