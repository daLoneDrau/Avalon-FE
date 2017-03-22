/**
 * 
 */
//var Hashcode = require("./Hashcode.js");
function Hexagon() {
    Hashcode.call(this);
    /** each hexagon has a unique id. */
    var id;
    /** hexagons have 6 edges; each edge is shared by another hexagon. */
    var edges = [ -1, -1, -1, -1, -1, -1 ];
    /** hexagons have 6 corners; each corner is shared by two other hexagons. */
    var corners = [ [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ],
        [ -1, -1 ], [ -1, -1 ] ];
    /** the hexagon's orientation; flat or pointed on top. */
    var flat;
    /** the hexagon's height. */
    var height;
    /** the horizontal distance between adjacent hexes. */
    var horizontalDistance;
    /** constants. */
    const sixty = 60, oneEighty = 180;
    /** constants. */
    const three = 3, four = 4, six = 6, thirty = 30;
    /** the distance between a hexagon's center point and a corner. */
    var size;
    /** the vertical distance between adjacent hexes. */
    var verticalDistance;
    /** the hexagon's width. */
    var width;
    /** cube coordinates. */
    var x = 0, y = 0, z = 0;
    /**
     * Sets the distance between a hexagon's center point and a corner.
     * @param newSize the hexagon's new size
     */
    this.setSize = function(newSize) {
        size = newSize;
        if (flat) {
            width = size * 2;
            horizontalDistance = width * three / four;
            height = Math.sqrt(three) / 2 * width;
            verticalDistance = height;
        } else {
            height = size * 2;
            verticalDistance = height * three / four;
            width = Math.sqrt(three) / 2 * height;
            horizontalDistance = width;
        }
    };
    
	if (arguments.length === 1) {
		flat = true;
        id = arguments[0];
        this.setSize(0);
	} else if (arguments.length === 2) {
		if (isNaN(arguments[0])){
			flat = true;
	        id = arguments[1];
	        this.setSize(0);
		} else {
			flat = arguments[0];
	        id = arguments[0];
	        this.setSize(arguments[1]);
		}
	} else if (arguments.length === 3) {
        id = arguments[1];
        flat = arguments[0];
        if (arguments[2] > 0) {
        	this.setSize(arguments[2]);
        }
	} else {
		throw new Error(
		        "Invalid number of arguments, must be 1 Attribute to copy, or 2 or 3 strings");
	}
	this.copyOf = function(hex) {
	    this.size = hex.size;
	    this.x = hex.getX();
	    this.y = hex.getY();
	    this.z = hex.getZ();
	};
    /**
     * Determines if this {@link Hexagon} is equal to the supplied coordinates.
     * @param x1 the x-coordinate
     * @param y1 the y-coordinate
     * @param z1 the z-coordinate
     * @return <tt>true</tt> if the coordinates match this instance;
     *         <tt>false</tt> otherwise
     */
    this.equals = function(x1, y1, z1) {
        var equals = false;
        if (x1 === x && y1 === y && z1 === z) {
            equals = true;
        }
        return equals;
    }
	/**
	 * Gets the value of the flat.
	 * @return {@link boolean}
	 */
	this.isFlat = function() {
	    return flat;
	};	
    /**
     * Gets the {@link Hexagon}'s position.
     * @return {@link SimpleVector3}
     */
    this.getVector = function() {
        return new SimpleVector3(x, y, z);
    }
    this.getCubeCoordinatesArt = function() {
        s = [];
        // s.push(" _ _ ");
        s.push("/");
        s.push(y);
        var len = y.toString().length;
        for (var i = "     ".length - len; i > 0; i--) {
            s.push("&nbsp;");
        }
        s.push("\\");
        s.push('\n');
        s.push("/");
        len = x.toString().length;
        for (var i = "       ".length - len; i > 0; i--) {
            s.push("&nbsp;");
        }
        s.push(x);
        s.push("\\");
        s.push('\n');
        s.push("\\");
        s.push(z);
        len = z.toString().length;
        for (var i = "       ".length - len; i > 0; i--) {
            s.push('&nbsp;');
        }
        s.push("/");
        s.push('\n');
        s.push("\\&nbsp;_&nbsp;_&nbsp;/");
        return s.join("");
    }
    this.getCubeCoordinatesArtHeight = function() {
        return 4;
    }
    this.getCubeCoordinatesArtWidth = function() {
        return 8;
    }
    /**
     * Gets the hexagon's height.
     * @return <tt>float</tt>
     */
    this.getHeight = function() {
        return height;
    }
    /**
     * Gets the position (vertex) of a specific corner of a hexagon.
     * @return {@link SimplePoint}
     */
    this.getHexCornerVertex = function() {
    	var center, cornerId;
    	if (arguments.length === 3) {
    		this.setSize(arguments[1]);
    		center = arguments[0];
    		cornerId = arguments[2];
    	} else if (arguments.length === 2) {
    		center = arguments[0];
    		cornerId = arguments[1];
    	} else {
    		throw new Error("Invalid number of arguments");
    	}
        if (size <= 0) {
            throw new Error("Size was never set!");
        }
        var offset = 0;
        if (!flat) {
            offset = thirty;
        }
        var angleDeg = sixty * cornerId + offset;
        var angleRad = Math.PI / oneEighty * angleDeg;
        return new SimplePoint(center.getX() + size * Math.cos(angleRad),
                center.getY() + size * Math.sin(angleRad));
    }
    /**
     * Gets the horizontal distance between adjacent hexes.
     * @return <tt>float</tt>
     */
    this.getHorizontalDistance = function() {
        return horizontalDistance;
    }
    this.getOffsetCoordinatesArt = function(grid) {
        var pt = grid.getOffsetCoordinates(this);
        var x1 = pt.getX();
        var y1 = pt.getY();
        var sb = [];
        // s.push(" _ _ ");
        sb.push("/     \\");
        sb.push('\n');
        sb.push("/");
        var len = x1.toString().length;
        len++;
        len += y1.toString().length;
        var off = "       ".length - len;
        var lef = off / 2;
        for (var i = lef; i > 0; i--) {
            sb.push(' ');
        }
        sb.push(x1);
        sb.push(",");
        sb.push(y1);
        for (var i = off - lef; i > 0; i--) {
            sb.push(' ');
        }
        sb.push("\\");
        sb.push('\n');
        sb.push("\\       /");
        sb.push('\n');
        sb.push("\\ _ _ /");
        var s = sb.join("");
        sb = null;
        return s;
    }
    /**
     * Gets the distance between a hexagon's center point and a corner.
     * @return <tt>float</tt>
     */
    this.getSize = function() {
        return size;
    }
    /**
     * Gets the vertical distance between adjacent hexes.
     * @return <tt>float</tt>
     */
    this.getVerticalDistance = function() {
        return verticalDistance;
    }
    /**
     * Gets the hexagon's width.
     * @return <tt>float</tt>
     */
    this.getWidth = function() {
        return width;
    }
    /**
     * Gets the value of the x coordinate.
     * @return {@link int}
     */
    this.getX = function() {
        return x;
    }
    /**
     * Gets the value of the y coordinate.
     * @return {@link int}
     */
    this.getY = function() {
        return y;
    }
    /**
     * Gets the value of the z coordinate.
     * @return {@link int}
     */
    this.getZ = function() {
        return z;
    }
    /**
     * Rotates the hexagon 60 degrees to the right.
     * @throws Exception if an error occurs
     */
    this.rotate = function() {
        var oldx = x, oldy = y, oldz = z;
        x = -oldz;
        y = -oldx;
        z = -oldy;
    }
    /**
     * Sets the {@link Hexagon}'s axial coordinates.
     * @param q the column
     * @param r the row
     */
    this.setCoordinates = function() {
    	if (arguments.length === 1
    			&& arguments[0] instanceof SimpleVector3) {
            x = arguments[0].getX();
            z = arguments[0].getY();
            y = arguments[0].getZ();
    	} else if (arguments.length === 2) {
	        x = arguments[0];
	        z = arguments[1];
	        y = -x - z;
    	} else if (arguments.length === 3) {
	        x = arguments[0];
	        y = arguments[1];
	        z = arguments[2];
    	}
    }
    this.toCubeCoordinateString = function() {
        return new SimpleVector3(x, y, z).toString();
    }
    this.getId = function() {
        return id;
    }
}