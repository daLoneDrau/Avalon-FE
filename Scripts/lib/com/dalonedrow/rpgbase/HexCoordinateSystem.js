/**
 *
 */
//var Hashcode = require("./Hashcode.js");
/**
 * A coordinate system for placing {@link Hexagon}s in a grid.
 * @author drau
 */
function HexCoordinateSystem(config) {
    Hashcode.call(this);
    /** direction N. */
    const DIRECTION_N   = 0;
    /** direction NNE. */
    const              DIRECTION_NNE = 1;
    /** direction NNW. */
    const              DIRECTION_NNW = 5;
    /** direction S. */
    const              DIRECTION_S   = 3;
    /** direction SSE. */
    const              DIRECTION_SSE = 2;
    /** direction SSW. */
    const              DIRECTION_SSW = 4;
    /**
     * <p>
     * layout where hex columns are aligned with even-numbered columns sticking
     * out at the bottom.
     * </p>
     * &nbsp;&nbsp;&nbsp;1,<b>0</b>&nbsp;&nbsp;&nbsp;3,<b>0</b><br>
     * 0,<b>0</b>&nbsp;&nbsp;&nbsp;2,<b>0</b>&nbsp;&nbsp;&nbsp;4,<b>0</b><br>
     * &nbsp;&nbsp;&nbsp;1,<b>1</b>&nbsp;&nbsp;&nbsp;3,<b>1</b><br>
     * 0,<b>1</b>&nbsp;&nbsp;&nbsp;2,<b>1</b>&nbsp;&nbsp;&nbsp;4,<b>1</b><br>
     */
    const              EVEN_Q        = 3;
    /**
     * <p>
     * layout where hex rows are aligned with even-numbered rows sticking out to
     * the right.
     * </p>
     * &nbsp;&nbsp;&nbsp;0,<b>0</b>&nbsp;&nbsp;&nbsp;1,<b>0</b>&nbsp;&nbsp;
     * &nbsp;2,<b>0</b> - row 0<br>
     * 0,<b>1</b>&nbsp;&nbsp;&nbsp;1,<b>1</b>&nbsp;&nbsp;&nbsp;2,<b>1</b>&nbsp;
     * &nbsp;&nbsp; - row 1<br>
     * &nbsp;&nbsp;&nbsp;0,<b>2</b>&nbsp;&nbsp;&nbsp;1,<b>2</b>&nbsp;&nbsp;
     * &nbsp;2,<b>2</b> - row 2<br>
     * 0,<b>3</b>&nbsp;&nbsp;&nbsp;1,<b>3</b>&nbsp;&nbsp;&nbsp;2,<b>3</b>&nbsp;
     * &nbsp;&nbsp; - row 3<br>
     */
    const              EVEN_R        = 1;
    /** pre-calculated changes to find a hex's neighbor coordinates. */
    const NEIGHBORS = [
            new SimpleVector3(0, 1, -1), new SimpleVector3(1, 0, -1),
            new SimpleVector3(1, -1, 0), new SimpleVector3(-0, -1, 1),
            new SimpleVector3(-1, 0, 1), new SimpleVector3(-1, 1, 0) ];
    /** pre-calculated changes to find a hex's neighbor coordinates. */
    const COMPOUND_NEIGHBORS     = [
            new SimpleVector3(4, 5, -9), // side 0
            new SimpleVector3(9, -4, -5), // side 1
            new SimpleVector3(5, -9, 4), // side 2
            new SimpleVector3(-4, -5, 9), // side 3
            new SimpleVector3(-9, 4, 5), // side 4
            new SimpleVector3(-5, 9, -4), // side 5 
            ];
    /**
     * <p>
     * layout where hex columns are aligned with odd-numbered columns sticking
     * out at the bottom.
     * </p>
     * 0,<b>0</b>&nbsp;&nbsp;&nbsp;2,<b>0</b>&nbsp;&nbsp;&nbsp;4,<b>0</b><br>
     * &nbsp;&nbsp;&nbsp;1,<b>0</b>&nbsp;&nbsp;&nbsp;3,<b>0</b><br>
     * 0,<b>1</b>&nbsp;&nbsp;&nbsp;2,<b>1</b>&nbsp;&nbsp;&nbsp;4,<b>1</b><br>
     * &nbsp;&nbsp;&nbsp;1,<b>1</b>&nbsp;&nbsp;&nbsp;3,<b>1</b><br>
     */
    const              ODD_Q         = 2;
    /**
     * <p>
     * layout where hex rows are aligned with odd-numbered rows sticking out to
     * the right.
     * </p>
     * 0,<b>0</b>&nbsp;&nbsp;&nbsp;1,<b>0</b>&nbsp;&nbsp;&nbsp;2,<b>0</b>&nbsp;
     * &nbsp;&nbsp; - row 0<br>
     * &nbsp;&nbsp;&nbsp;0,<b>1</b>&nbsp;&nbsp;&nbsp;1,<b>1</b>&nbsp;&nbsp;
     * &nbsp;2,<b>1</b> - row 1<br>
     * 0,<b>2</b>&nbsp;&nbsp;&nbsp;1,<b>2</b>&nbsp;&nbsp;&nbsp;2,<b>2</b>&nbsp;
     * &nbsp;&nbsp; - row 2<br>
     * &nbsp;&nbsp;&nbsp;0,<b>3</b>&nbsp;&nbsp;&nbsp;1,<b>3</b>&nbsp;&nbsp;
     * &nbsp;2,<b>3</b> - row 3<br>
     */
    const              ODD_R         = 0;
    /** the list of {@link Hexagon}s in the coordinate system. */
    var                    hexes         = [];
    /** the next available reference id. */
    var                          nextId = 0;
    /** the system's offset configuration. */
    var                          offsetConfiguration = config;
    /**
    /**
     * Adds a {@link Hexagon} to the coordinate system.
     * @param hex the {@link Hexagon} being added
     */
    this.addHexagon = function(hex) {
    	if (arguments.length === 1) {
            hexes.push(arguments[0]);
    	} else if (arguments.length === 2) {
            var hex = new Hexagon(nextId++);
            hex.setCoordinates(arguments[0], arguments[1]);
            hexes.push(hex);
            return hex;
    	} else {
    		throw new Error("Invalid number of arguments");
    	}
    }
    /**
     * Gets the distance between two hexes.
     * @param hex0 the first hex
     * @param hex1 the second hex
     * @return <code>int</code>
     */
    this.distance = function(arg0, arg1) {
    	if (arg0 instanceof Hexagon
    			&& arg1 instanceof Hexagon) {
            return (Math.abs(arg0.getX() - arg1.getX())
                    + Math.abs(arg0.getY() - arg1.getY())
                    + Math.abs(arg0.getZ() - arg1.getZ())) / 2;
    	} else if (arg0 instanceof SimpleVector3
    			&& arg1 instanceof SimpleVector3) {
            return ((Math.abs(arg0.getX() - arg1.getX())
                    + Math.abs(arg0.getY() - arg1.getY())
                    + Math.abs(arg0.getZ() - arg1.getZ())) / 2);
    	} else {
    		throw new Error("Invalid arguments");
    	}
    }
    /**
     * Gets the {@link Hexagon}'s axial coordinates.
     * @param hexagon the {@link Hexagon}
     * @return {@link SimpleVector2}
     */
    this.getAxialCoordinates = function(hexagon) {
        return new SimpleVector2(hexagon.getX(), hexagon.getZ());
    }
    /**
     * Gets the {@link Hexagon}'s cube coordinates.
     * @param hexagon the {@link Hexagon}
     * @return {@link SimpleVector3}
     */
    public SimpleVector3 getCubeCoordinates = function(final Hexagon hexagon) {
        return new SimpleVector3(
                hexagon.getX(), hexagon.getY(), hexagon.getZ());
    }
    /**
     * Gets the cube coordinates for a specific column and row.
     * @param q the column
     * @param r the row
     * @return {@link SimpleVector3}
     * @throws Exception if the system's offset configuration is invalid
     */
    public SimpleVector3 getCubeCoordinates = function(final int q, final int r)
            throws Exception {
        SimpleVector3 v3 = new SimpleVector3();
        int x1, y1, z1;
        switch (offsetConfiguration) {
            case EVEN_Q:
                x1 = q;
                z1 = r - (q + (q & 1)) / 2;
                y1 = -x1 - z1;
                break;
            case ODD_Q:
                x1 = q;
                z1 = r - (q - (q & 1)) / 2;
                y1 = -x1 - z1;
                break;
            case EVEN_R:
                x1 = q - (r + (r & 1)) / 2;
                z1 = r;
                y1 = -x1 - z1;
                break;
            case ODD_R:
                x1 = q - (r - (r & 1)) / 2;
                z1 = r;
                y1 = -x1 - z1;
                break;
            default:
                throw new Exception("Invalid offset configuration "
                        + offsetConfiguration);
        }
        v3.set(x1, y1, z1);
        return v3;
    }
    /**
     * Gets a hexagon at a specific set of coordinates.
     * @param x the x-coordinate
     * @param y the y-coordinate
     * @param z the z-coordinate
     * @return {@link Hexagon}
     */
    this.getHexagon = function(final int x, final int y, final int z) {
        Hexagon hex = null;
        for (int i = hexes.length - 1; i >= 0; i--) {
            if (hexes[i].equals(x, y, z)) {
                hex = hexes[i];
                break;
            }
        }
        return hex;
    }
    /**
     * Gets a hexagon at a specific set of coordinates.
     * @param v3 the set of coordinates
     * @return {@link Hexagon}
     */
    this.getHexagon = function(final SimpleVector3 v3) {
        return getHexagon((int) v3.getX(), (int) v3.getY(), (int) v3.getZ());
    }
    /**
     * Gets a hexagon associated with a specific clearing.
     * @param clearingId the clearing id
     * @return {@link Hexagon}
     */
    this.getHexagonForClearing = function(final int clearingId) {
        Hexagon hex = null;
        for (int i = hexes.length - 1; i >= 0; i--) {
            if (hexes[i] instanceof TerrainHexagon) {
                if (((TerrainHexagon) hexes[i]).getClearingId() == clearingId) {
                    hex = hexes[i];
                    break;
                }
            }
        }
        return hex;
    }
    /**
     * Gets the coordinates for a neighboring {@link Hexagon}.
     * @param hexagon the original {@link Hexagon}
     * @param direction the direction in which the neighbor lies
     * @return {@link SimpleVector3}
     * @throws Exception if the direction was invalid
     */
    public SimpleVector3 getNeighborCoordinates = function(final Hexagon hexagon,
            final int direction) throws Exception {
        SimpleVector3 neighbor =
                new SimpleVector3(hexagon.getX(), hexagon.getY(), hexagon
                        .getZ());
        return getNeighborCoordinates(neighbor, direction, hexagon.isFlat());
    }
    /**
     * Gets the coordinates for a neighboring {@link Hexagon}.
     * @param coords the original {@link Hexagon}'s coordinates
     * @param direction the direction of the neighboring {@link Hexagon}
     * @return {@link SimpleVector3}
     * @throws Exception if the direction was invalid
     */
    public SimpleVector3 getNeighborCoordinates = function(final SimpleVector3 coords,
            final int direction, final boolean flat) throws Exception {
        SimpleVector3 neighbor = new SimpleVector3(coords);
        if (flat) {
            neighbor.increment(HexCoordinateSystem.NEIGHBORS[direction]);
        } else {
            int d = direction - 1;
            if (d < 0) {
                d = 5;
            }
            neighbor.increment(HexCoordinateSystem.NEIGHBORS[d]);
        }
        return neighbor;
    }
    /**
     * Gets the coordinates for a neighboring {@link Hexagon}.
     * @param coords the original {@link Hexagon}'s coordinates
     * @param direction the direction of the neighboring {@link Hexagon}
     * @return {@link SimpleVector3}
     * @throws Exception if the direction was invalid
     */
    public SimpleVector3 getNeighborCoordinates = function(final SimpleVector3 coords,
            final int direction) throws Exception {
        return this.getNeighborCoordinates(coords, direction, true);
    }
    /**
     * Gets the next available reference id.
     * @return <code>int</code>
     */
    this.getNextId = function() {
        return nextId++;
    }
    /**
     * Gets the value of the offsetConfiguration.
     * @return {@link int}
     */
    this.getOffsetConfiguration = function() {
        return offsetConfiguration;
    }
    /**
     * Gets a {@link Hexagon}'s offset coordinates.
     * @param hexagon the {@link Hexagon}
     * @return {@link SimplePoint}
     * @throws Exception if the offset configuration was set to an invalid value
     */
    this.getOffsetCoordinates = function(final Hexagon hexagon)
            throws Exception {
        int col, row;
        switch (offsetConfiguration) {
            case EVEN_Q:
                col = hexagon.getX();
                row =
                        hexagon.getZ()
                                + (hexagon.getX() + (hexagon.getX() & 1)) / 2;
                break;
            case ODD_Q:
                col = hexagon.getX();
                row =
                        hexagon.getZ()
                                + (hexagon.getX() - (hexagon.getX() & 1)) / 2;
                break;
            case EVEN_R:
                col =
                        hexagon.getX()
                                + (hexagon.getZ() + (hexagon.getZ() & 1)) / 2;
                row = hexagon.getZ();
                break;
            case ODD_R:
                col =
                        hexagon.getX()
                                + (hexagon.getZ() - (hexagon.getZ() & 1)) / 2;
                row = hexagon.getZ();
                break;
            default:
                throw new Exception("Invalid offset configuration "
                        + offsetConfiguration);
        }
        return new SimplePoint(col, row);
    }
    this.getSharedEdge = function(final Hexagon hex0, final Hexagon hex1)
            throws Exception {
        return this.getSharedEdge(hex0.getVector(), hex1.getVector());
    }
    this.getSharedEdge = function(final SimpleVector3 hex0, final SimpleVector3 hex1)
            throws Exception {
        int i = 0;
        if (distance(hex0, hex1) == 1) {
            for (; i < HexCoordinateSystem.NEIGHBORS.length; i++) {
                SimpleVector3 v0 = new SimpleVector3(hex1);
                v0.decrement(hex0);
                if (v0.equals(HexCoordinateSystem.NEIGHBORS[i])) {
                    break;
                }
            }
        } else {
            throw new Exception("The hexes are not neighbors - " + hex0 + ", "
                    + hex1);
        }
        return i;
    }
    public String printView = function(final Hexagon center) throws Exception {
        // get Northern coordinates
        SimpleVector3 nv =
                getNeighborCoordinates(center, HexCoordinateSystem.DIRECTION_N);
        nv = getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        nv = getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        nv = getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        // get Southern coordinates
        SimpleVector3 sv =
                getNeighborCoordinates(center, HexCoordinateSystem.DIRECTION_S);
        sv = getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        sv = getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        sv = getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        // all hexes saved in coordinates
        // need to print 7 * height lines
        // print hexes
        int sD = distance(nv, sv) + 1;
        // need to print
        int numLines = sD * center.getCubeCoordinatesArtHeight();
        PooledStringBuilder line =
                StringBuilderPool.getInstance().getStringBuilder();
        // switch to offset coords
        int q = (int) (getOffsetCoordinates(center).getX() - 4);
        int maxQ = (int) (getOffsetCoordinates(center).getX() + 4);
        int r = (int) (getOffsetCoordinates(center).getY() - 4);
        for (int i = 0; i < numLines; i++) {
            if (i % 4 == 0 && i > 0) {
                r++;
            }
            PooledStringBuilder sb =
                    StringBuilderPool.getInstance().getStringBuilder();
            boolean centerisOdd = getOffsetCoordinates(center).getX() % 2 == 1;
            int col = q;
            while (col <= maxQ) {
                boolean columnIsEven = col % 2 == 0;
                int row = r;
                if (centerisOdd) {
                    if (columnIsEven) {
                        if (i % 4 < 2) {
                            row--;
                        }
                    }
                } else {
                    if (!columnIsEven) {
                        if (i % 4 > 1) {
                            row++;
                        }
                    }
                }
                SimpleVector3 v3 = getCubeCoordinates(col, row);
                Hexagon hex = getHexagon(v3);
                if (hex != null) {
                    String[] split = hex.getCubeCoordinatesArt().split("\n");
                    if (hex instanceof TerrainHexagon) {
                        split =
                                ((TerrainHexagon) hex).getAsciiArt()
                                .split("\n");
                    }
                    // how do i know if i am printing top or bottom?
                    if (centerisOdd) {
                        if (columnIsEven) {
                            if (i % 4 < 2) {
                                // printing bottom
                                if ((i % 4 == 1 || i % 4 == 2)
                                        && sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append(split[i % 4 + 2]);
                            } else {
                                // printing top
                                if ((i % 4 == 1 || i % 4 == 2)
                                        && sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append(split[i % 4 - 2]);
                            }
                        } else {
                            if ((i % 4 == 0 || i % 4 == 3) && sb.length() == 0) {
                                sb.append(' ');
                            }
                            sb.append(split[i % 4]);
                        }
                    } else {
                        // center is not odd
                        if (columnIsEven) {
                            if ((i % 4 == 0 || i % 4 == 3) && sb.length() == 0) {
                                sb.append(' ');
                            }
                            sb.append(split[i % 4]);
                        } else {
                            if (i % 4 < 2) {
                                // printing bottom
                                if ((i % 4 == 1 || i % 4 == 2)
                                        && sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append(split[i % 4 + 2]);
                            } else {
                                // printing top
                                if ((i % 4 == 1 || i % 4 == 2)
                                        && sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append(split[i % 4 - 2]);
                            }
                        }
                    }
                } else {
                    if (centerisOdd) {
                        if (columnIsEven) {
                            if (i % 4 == 1 || i % 4 == 2) {
                                if (sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append("|*****|");
                            } else {
                                sb.append("|*******|");
                            }
                        } else {
                            if (i % 4 == 0 || i % 4 == 3) {
                                if (sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append("|*****|");
                            } else {
                                sb.append("|*******|");
                            }
                        }
                    } else {
                        if (columnIsEven) {
                            if (i % 4 == 0 || i % 4 == 3) {
                                if (sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append("|*****|");
                            } else {
                                sb.append("|*******|");
                            }
                        } else {
                            if (i % 4 == 1 || i % 4 == 2) {
                                if (sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append("|*****|");
                            } else {
                                sb.append("|*******|");
                            }
                        }
                    }
                }
                col++;
            }
            line.append(sb.toString());
            line.append('\n');
            sb.returnToPool();
            sb = null;
        }
        String s = line.toString();
        line.returnToPool();
        line = null;
        return s;
    }
    public String printGrid = function(final Hexagon center) throws Exception {
        // get Northern coordinates
        SimpleVector3 nv =
                getNeighborCoordinates(center, HexCoordinateSystem.DIRECTION_N);
        nv = getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        nv = getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        nv = getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        // get Southern coordinates
        SimpleVector3 sv =
                getNeighborCoordinates(center, HexCoordinateSystem.DIRECTION_S);
        sv = getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        sv = getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        sv = getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        // all hexes saved in coordinates
        // need to print 7 * height lines
        // print hexes
        int sD = distance(nv, sv) + 1;
        // need to print
        int numLines = sD * center.getCubeCoordinatesArtHeight();
        PooledStringBuilder line =
                StringBuilderPool.getInstance().getStringBuilder();
        // switch to offset coords
        int q = (int) (getOffsetCoordinates(center).getX() - 4);
        int maxQ = (int) (getOffsetCoordinates(center).getX() + 4);
        int r = (int) (getOffsetCoordinates(center).getY() - 4);
        for (int i = 0; i < numLines; i++) {
            if (i % 4 == 0 && i > 0) {
                r++;
            }
            PooledStringBuilder sb =
                    StringBuilderPool.getInstance().getStringBuilder();
            boolean centerisOdd = getOffsetCoordinates(center).getX() % 2 == 1;
            int col = q;
            while (col <= maxQ) {
                boolean columnIsEven = col % 2 == 0;
                int row = r;
                if (centerisOdd) {
                    if (columnIsEven) {
                        if (i % 4 < 2) {
                            row--;
                        }
                    }
                } else {
                    if (!columnIsEven) {
                        if (i % 4 > 1) {
                            row++;
                        }
                    }
                }
                SimpleVector3 v3 = getCubeCoordinates(col, row);
                Hexagon hex = getHexagon(v3);
                if (hex != null) {
                    String[] split = hex.getCubeCoordinatesArt().split("\n");
                    if (hex instanceof TerrainHexagon) {
                        split =
                                ((TerrainHexagon) hex).getAsciiArt()
                                .split("\n");
                    }
                    // how do i know if i am printing top or bottom?
                    if (centerisOdd) {
                        if (columnIsEven) {
                            if (i % 4 < 2) {
                                // printing bottom
                                if ((i % 4 == 1 || i % 4 == 2)
                                        && sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append(split[i % 4 + 2]);
                            } else {
                                // printing top
                                if ((i % 4 == 1 || i % 4 == 2)
                                        && sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append(split[i % 4 - 2]);
                            }
                        } else {
                            if ((i % 4 == 0 || i % 4 == 3) && sb.length() == 0) {
                                sb.append(' ');
                            }
                            sb.append(split[i % 4]);
                        }
                    } else {
                        // center is not odd
                        if (columnIsEven) {
                            if ((i % 4 == 0 || i % 4 == 3) && sb.length() == 0) {
                                sb.append(' ');
                            }
                            sb.append(split[i % 4]);
                        } else {
                            if (i % 4 < 2) {
                                // printing bottom
                                if ((i % 4 == 1 || i % 4 == 2)
                                        && sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append(split[i % 4 + 2]);
                            } else {
                                // printing top
                                if ((i % 4 == 1 || i % 4 == 2)
                                        && sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append(split[i % 4 - 2]);
                            }
                        }
                    }
                } else {
                    if (centerisOdd) {
                        if (columnIsEven) {
                            if (i % 4 == 1 || i % 4 == 2) {
                                if (sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append("|*****|");
                            } else {
                                sb.append("|*******|");
                            }
                        } else {
                            if (i % 4 == 0 || i % 4 == 3) {
                                if (sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append("|*****|");
                            } else {
                                sb.append("|*******|");
                            }
                        }
                    } else {
                        if (columnIsEven) {
                            if (i % 4 == 0 || i % 4 == 3) {
                                if (sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append("|*****|");
                            } else {
                                sb.append("|*******|");
                            }
                        } else {
                            if (i % 4 == 1 || i % 4 == 2) {
                                if (sb.length() == 0) {
                                    sb.append(' ');
                                }
                                sb.append("|*****|");
                            } else {
                                sb.append("|*******|");
                            }
                        }
                    }
                }
                col++;
            }
            line.append(sb.toString());
            line.append('\n');
            sb.returnToPool();
            sb = null;
        }
        String s = line.toString();
        line.returnToPool();
        line = null;
        return s;
    }
    this.moveCompoundHexagonToSide = function(compoundHexagon, 
            final SimpleVector3 v3, final int side) {
        // find current location
        var current = this.getHexagon(v3);
        console.log("found hex " 
        + new String(((HexTile)current).getName()) + " at " + v3);
        for (int i = current.getNumberOfHexes() - 1; i >= 0; i--) {
            SimpleVector3 v = 
                    new SimpleVector3(current.getHexagon(i).getVector());
            v.increment(HexCoordinateSystem.COMPOUND_NEIGHBORS[side]);
            compoundHexagon.getHexagon(i).setCoordinates(v);
        }
    }
}