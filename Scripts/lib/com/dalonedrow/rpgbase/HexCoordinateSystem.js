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
    /** the list of {@link Hexagon}s in the coordinate system. */
    var hexes         = [];
    /** the next available reference id. */
    var nextId = 0;
    /** the system's offset configuration. */
    var offsetConfiguration = config;
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
    this.getCubeCoordinates = function(hexagon) {
        return new SimpleVector3(hexagon.getX(), hexagon.getY(), hexagon.getZ());
    }
    /**
     * Gets the cube coordinates for a specific column and row.
     * @param q the column
     * @param r the row
     * @return {@link SimpleVector3}
     */
    this.getCubeCoordinates = function(q, r) {
        var v3 = new SimpleVector3();
        var x1, y1, z1;
        switch (offsetConfiguration) {
            case HexCoordinateSystem.EVEN_Q:
                x1 = q;
                z1 = r - (q + (q & 1)) / 2;
                y1 = -x1 - z1;
                break;
            case HexCoordinateSystem.ODD_Q:
                x1 = q;
                z1 = r - (q - (q & 1)) / 2;
                y1 = -x1 - z1;
                break;
            case HexCoordinateSystem.EVEN_R:
                x1 = q - (r + (r & 1)) / 2;
                z1 = r;
                y1 = -x1 - z1;
                break;
            case HexCoordinateSystem.ODD_R:
                x1 = q - (r - (r & 1)) / 2;
                z1 = r;
                y1 = -x1 - z1;
                break;
            default:
                throw new Error("Invalid offset configuration "
                        + offsetConfiguration);
        }
        v3.set(x1, y1, z1);
        return v3;
    }
    /**
     * Gets a hexagon at a specific set of coordinates.
     * @return {@link Hexagon}
     */
    this.getHexagon = function() {
        var hex = null;
        if (arguments.length === 1
        		&& arguments[0] instanceof SimpleVector3) {
	        for (var i = hexes.length - 1; i >= 0; i--) {
	            if (hexes[i].equals(arguments[0].getX(), arguments[0].getY(), arguments[0].getZ())) {
	                hex = hexes[i];
	                break;
	            }
	        }
        } else if (arguments.length === 3) {
	        for (var i = hexes.length - 1; i >= 0; i--) {
	            if (hexes[i].equals(arguments[0], arguments[1], arguments[2])) {
	                hex = hexes[i];
	                break;
	            }
	        }
        } else {
    		throw new Error("Invalid # of arguments");
    	}
        return hex;
    }
    /**
     * Gets a hexagon associated with a specific clearing.
     * @param clearingId the clearing id
     * @return {@link Hexagon}
     */
    this.getHexagonForClearing = function(clearingId) {
        var hex = null;
        for (var i = hexes.length - 1; i >= 0; i--) {
            if (hexes[i] instanceof TerrainHexagon) {
                if (hexes[i].getClearingId() === clearingId) {
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
     */
    this.getNeighborCoordinates = function() {
        var neighbor, direction, flat;
        if (arguments.length === 2
        		&& (arguments[0] instanceof Hexagon
        		|| arguments[0] instanceof TerrainHexagon)) {
        	neighbor = new SimpleVector3(arguments[0].getX(), arguments[0].getY(), arguments[0].getZ());
        	flat = arguments[0].isFlat();
        	direction = arguments[1];
        } else if (arguments.length === 2
        		&& arguments[0] instanceof SimpleVector3) {
        	neighbor = new SimpleVector3(arguments[0]);
        	direction = arguments[1];
        	flat = true;
        } else if (arguments.length === 3
        		&& arguments[0] instanceof SimpleVector3) {
        	neighbor = new SimpleVector3(arguments[0]);
        	direction = arguments[1];
        	flat = arguments[2];
        } else {
    		throw new Error("Invalid # of arguments");
    	}
        if (flat) {
            neighbor.increment(HexCoordinateSystem.NEIGHBORS[direction]);
        } else {
            var d = direction - 1;
            if (d < 0) {
                d = 5;
            }
            neighbor.increment(HexCoordinateSystem.NEIGHBORS[d]);
        }
        return neighbor;
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
     * @return {@link SimpleVector2}
     * @throws Error if the offset configuration was set to an invalid value
     */
    this.getOffsetCoordinates = function(hexagon) {
        var col, row;
        switch (offsetConfiguration) {
            case HexCoordinateSystem.EVEN_Q:
                col = hexagon.getX();
                row =
                        hexagon.getZ()
                                + (hexagon.getX() + (hexagon.getX() & 1)) / 2;
                break;
            case HexCoordinateSystem.ODD_Q:
                col = hexagon.getX();
                row =
                        hexagon.getZ()
                                + (hexagon.getX() - (hexagon.getX() & 1)) / 2;
                break;
            case HexCoordinateSystem.EVEN_R:
                col =
                        hexagon.getX()
                                + (hexagon.getZ() + (hexagon.getZ() & 1)) / 2;
                row = hexagon.getZ();
                break;
            case HexCoordinateSystem.ODD_R:
                col =
                        hexagon.getX()
                                + (hexagon.getZ() - (hexagon.getZ() & 1)) / 2;
                row = hexagon.getZ();
                break;
            default:
                throw new Error("Invalid offset configuration "
                        + offsetConfiguration);
        }
        return new SimpleVector2(col, row);
    }
    this.getSharedEdge = function() {
        var i = 0, v0, v1;
		if (arguments[0] instanceof Hexagon) {
			v0 = arguments[0].getVector();
			v1 = arguments[1].getVector();
		} else if (arguments[0] instanceof SimpleVector3) {
			v0 = arguments[0];
			v1 = arguments[1];
		} else {
            throw new Error("Invalid arguments");
		}
        if (distance(v0, v1) == 1) {
            for (; i < HexCoordinateSystem.NEIGHBORS.length; i++) {
                v0 = new SimpleVector3(v1);
                v0.decrement(v0);
                if (v0.equals(HexCoordinateSystem.NEIGHBORS[i])) {
                    break;
                }
            }
        } else {
            throw new Error("The hexes are not neighbors - " + hex0 + ", " + hex1);
        }
        return i;
    }
    this.printView = function(center) {
        // get Northern coordinates
        var nv = this.getNeighborCoordinates(center, HexCoordinateSystem.DIRECTION_N);
        nv = this.getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        nv = this.getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        nv = this.getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        // get Southern coordinates
        var sv = this.getNeighborCoordinates(center, HexCoordinateSystem.DIRECTION_S);
        sv = this.getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        sv = this.getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        sv = this.getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        // all hexes saved in coordinates
        // need to print 7 * height lines
        // print hexes
        var sD = this.distance(nv, sv) + 1;
        // need to print
        var numLines = sD * center.getCubeCoordinatesArtHeight();
        var line = [];
        // switch to offset coords
        var q = this.getOffsetCoordinates(center).getX() - 4;
        var maxQ = this.getOffsetCoordinates(center).getX() + 4;
        var r = this.getOffsetCoordinates(center).getY() - 4;
        for (var i = 0; i < numLines; i++) {
            if (i % 4 == 0 && i > 0) {
                r++;
            }
            var sb = [];
            var centerisOdd = this.getOffsetCoordinates(center).getX() % 2 == 1;
            var col = q;
            while (col <= maxQ) {
            	var columnIsEven = col % 2 == 0;
            	var row = r;
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
                var v3 = this.getCubeCoordinates(col, row);
                var hex = this.getHexagon(v3);
                if (hex !== null) {
                	var split = hex.getCubeCoordinatesArt().split("\n");
                    if (hex instanceof TerrainHexagon) {
                        split = hex.getAsciiArt().split("\n");
                    }
                    // how do i know if i am printing top or bottom?
                    if (centerisOdd) {
                        if (columnIsEven) {
                            if (i % 4 < 2) {
                                // printing bottom
                                if ((i % 4 === 1 || i % 4 === 2)
                                        && sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push(split[i % 4 + 2]);
                            } else {
                                // printing top
                                if ((i % 4 === 1 || i % 4 === 2)
                                        && sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push(split[i % 4 - 2]);
                            }
                        } else {
                            if ((i % 4 === 0 || i % 4 === 3) && sb.length === 0) {
                                sb.push('&nbsp;');
                            }
                            sb.push(split[i % 4]);
                        }
                    } else {
                        // center is not odd
                        if (columnIsEven) {
                            if ((i % 4 === 0 || i % 4 === 3) && sb.length === 0) {
                                sb.push('&nbsp;');
                            }
                            sb.push(split[i % 4]);
                        } else {
                            if (i % 4 < 2) {
                                // printing bottom
                                if ((i % 4 === 1 || i % 4 === 2)
                                        && sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push(split[i % 4 + 2]);
                            } else {
                                // printing top
                                if ((i % 4 == 1 || i % 4 === 2)
                                        && sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push(split[i % 4 - 2]);
                            }
                        }
                    }
                } else {
                    if (centerisOdd) {
                        if (columnIsEven) {
                            if (i % 4 === 1 || i % 4 === 2) {
                                if (sb.length == 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push("|*****|");
                            } else {
                                sb.push("|*******|");
                            }
                        } else {
                            if (i % 4 == 0 || i % 4 === 3) {
                                if (sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push("|*****|");
                            } else {
                                sb.push("|*******|");
                            }
                        }
                    } else {
                        if (columnIsEven) {
                            if (i % 4 === 0 || i % 4 === 3) {
                                if (sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push("|*****|");
                            } else {
                                sb.push("|*******|");
                            }
                        } else {
                            if (i % 4 === 1 || i % 4 === 2) {
                                if (sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push("|*****|");
                            } else {
                                sb.push("|*******|");
                            }
                        }
                    }
                }
                col++;
            }
            line.push(sb.join(""));
            line.push('\n');
            sb = null;
        }
        var s = line.join("");
        line = null;
        return s;
    }
    this.printGrid = function(center) {
        // get Northern coordinates
    	var nv = getNeighborCoordinates(center, HexCoordinateSystem.DIRECTION_N);
        nv = getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        nv = getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        nv = getNeighborCoordinates(nv, HexCoordinateSystem.DIRECTION_N);
        // get Southern coordinates
        var sv = getNeighborCoordinates(center, HexCoordinateSystem.DIRECTION_S);
        sv = getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        sv = getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        sv = getNeighborCoordinates(sv, HexCoordinateSystem.DIRECTION_S);
        // all hexes saved in coordinates
        // need to print 7 * height lines
        // print hexes
        var sD = distance(nv, sv) + 1;
        // need to print
        var numLines = sD * center.getCubeCoordinatesArtHeight();
        var line = [];
        // switch to offset coords
        var q = getOffsetCoordinates(center).getX() - 4;
        var maxQ = getOffsetCoordinates(center).getX() + 4;
        var r = getOffsetCoordinates(center).getY() - 4;
        for (var i = 0; i < numLines; i++) {
            if (i % 4 === 0 && i > 0) {
                r++;
            }
            var sb = [];
            var centerisOdd = getOffsetCoordinates(center).getX() % 2 === 1;
            var col = q;
            while (col <= maxQ) {
            	var columnIsEven = col % 2 === 0;
            	var row = r;
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
                var v3 = getCubeCoordinates(col, row);
                var hex = getHexagon(v3);
                if (hex != null) {
                	var split = hex.getCubeCoordinatesArt().split("\n");
                    if (hex instanceof TerrainHexagon) {
                        split = hex.getAsciiArt().split("\n");
                    }
                    // how do i know if i am printing top or bottom?
                    if (centerisOdd) {
                        if (columnIsEven) {
                            if (i % 4 < 2) {
                                // printing bottom
                                if ((i % 4 === 1 || i % 4 == 2)
                                        && sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push(split[i % 4 + 2]);
                            } else {
                                // printing top
                                if ((i % 4 == 1 || i % 4 == 2)
                                        && sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push(split[i % 4 - 2]);
                            }
                        } else {
                            if ((i % 4 === 0 || i % 4 === 3) && sb.length === 0) {
                                sb.push('&nbsp;');
                            }
                            sb.push(split[i % 4]);
                        }
                    } else {
                        // center is not odd
                        if (columnIsEven) {
                            if ((i % 4 === 0 || i % 4 === 3) && sb.length === 0) {
                                sb.push('&nbsp;');
                            }
                            sb.push(split[i % 4]);
                        } else {
                            if (i % 4 < 2) {
                                // printing bottom
                                if ((i % 4 === 1 || i % 4 === 2)
                                        && sb.length == 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push(split[i % 4 + 2]);
                            } else {
                                // printing top
                                if ((i % 4 == 1 || i % 4 === 2)
                                        && sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push(split[i % 4 - 2]);
                            }
                        }
                    }
                } else {
                    if (centerisOdd) {
                        if (columnIsEven) {
                            if (i % 4 === 1 || i % 4 === 2) {
                                if (sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push("|*****|");
                            } else {
                                sb.push("|*******|");
                            }
                        } else {
                            if (i % 4 === 0 || i % 4 === 3) {
                                if (sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push("|*****|");
                            } else {
                                sb.push("|*******|");
                            }
                        }
                    } else {
                        if (columnIsEven) {
                            if (i % 4 === 0 || i % 4 === 3) {
                                if (sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push("|*****|");
                            } else {
                                sb.push("|*******|");
                            }
                        } else {
                            if (i % 4 === 1 || i % 4 === 2) {
                                if (sb.length === 0) {
                                    sb.push('&nbsp;');
                                }
                                sb.push("|*****|");
                            } else {
                                sb.push("|*******|");
                            }
                        }
                    }
                }
                col++;
            }
            line.push(sb.join(""));
            line.push('\n');
            sb = null;
        }
        var s = line.join("");
        line = null;
        return s;
    }
    this.moveCompoundHexagonToSide = function(compoundHexagon, v3, side) {
        // find current location
        var current = this.getHexagon(v3);
        console.log("found hex " + current.getName() + " at " + v3);
        for (var i = current.getNumberOfHexes() - 1; i >= 0; i--) {
            var v = new SimpleVector3(current.getHexagon(i).getVector());
            v.increment(HexCoordinateSystem.COMPOUND_NEIGHBORS[side]);
            compoundHexagon.getHexagon(i).setCoordinates(v);
        }
    }
}
/** direction N. */
HexCoordinateSystem.DIRECTION_N   = 0;
/** direction NNE. */
HexCoordinateSystem.DIRECTION_NNE = 1;
/** direction NNW. */
HexCoordinateSystem.DIRECTION_NNW = 5;
/** direction S. */
HexCoordinateSystem.DIRECTION_S   = 3;
/** direction SSE. */
HexCoordinateSystem.DIRECTION_SSE = 2;
/** direction SSW. */
HexCoordinateSystem.DIRECTION_SSW = 4;
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
HexCoordinateSystem.EVEN_Q        = 3;
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
HexCoordinateSystem.EVEN_R        = 1;
/** pre-calculated changes to find a hex's neighbor coordinates. */
HexCoordinateSystem.NEIGHBORS = [
        new SimpleVector3(0, 1, -1), new SimpleVector3(1, 0, -1),
        new SimpleVector3(1, -1, 0), new SimpleVector3(-0, -1, 1),
        new SimpleVector3(-1, 0, 1), new SimpleVector3(-1, 1, 0) ];
/** pre-calculated changes to find a hex's neighbor coordinates. */
HexCoordinateSystem.COMPOUND_NEIGHBORS     = [
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
HexCoordinateSystem.ODD_Q         = 2;
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
HexCoordinateSystem.ODD_R         = 0;