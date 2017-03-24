/**
 * A graph Vertex or Node, that also represents a point in 2-dimensional space.
 * @author DaLoneDrow
 */
function PhysicalGraphNode() {
    Hashcode.call(this);
    /** the integer representing the node's map location. */
    var location;
    if (arguments.length === 4
    		&& parseInt(arguments[1]) === parseInt(arguments[1])
    		&& parseInt(arguments[2]) === parseInt(arguments[2])
    		&& parseInt(arguments[3]) === parseInt(arguments[3])) {
    	GraphNode.call(this, arguments[0], arguments[1]);
    	location = TwoDimensional.convertPointToInt(arguments[2], arguments[3]);
    } else if (arguments.length === 3
    		&& parseInt(arguments[1]) === parseInt(arguments[1])
    		&& arguments[2] instanceof SimpleVector2) {
    	GraphNode.call(this, arguments[0], arguments[1]);
    	location = TwoDimensional.convertPointToInt(arguments[2].getX(), arguments[2].getY());
    } else if (arguments.length === 3
    		&& parseInt(arguments[0]) === parseInt(arguments[0])
    		&& parseInt(arguments[1]) === parseInt(arguments[1])
    		&& parseInt(arguments[2]) === parseInt(arguments[2])) {
    	GraphNode.call(this, arguments[0]);
    	location = TwoDimensional.convertPointToInt(arguments[1], arguments[2]);
    } else if (arguments.length === 2
    		&& parseInt(arguments[0]) === parseInt(arguments[0])
    		&& arguments[1] instanceof SimpleVector2) {
    	GraphNode.call(this, arguments[0]);
    	location = TwoDimensional.convertPointToInt(arguments[1].getX(), arguments[1].getY());
    } else {
    	throw new Error("Invalid # of arguments");
    }
    /**
     * Determines if this {@link PhysicalGraphNode} equals a specific set of
     * coordinates.
     * @return <tt>true</tt> if the {@link PhysicalGraphNode} equals the
     *         coordinates; <tt>false</tt> otherwise
     */
    this.equals = function() {
        var equals = false;
    	if (arguments.length === 2) {
    		equals = location === TwoDimensional.convertPointToInt(arguments[0], arguments[1]);
    	} else if (arguments.length === 1
        		&& arguments[0] instanceof SimpleVector2) {
    		equals = location === TwoDimensional.convertPointToInt(arguments[0].getX(), arguments[0].getY());
    	} else {
        	throw new Error("Invalid # of arguments");
        }
        return equals;
    }
    /**
     * Gets the node's coordinates.
     * @return {@link SimpleVector2}
     */
    this.getLocation = function() {
        return TwoDimensional.convertIntToVector(location);
    }
    /**
     * Sets the value of the location.
     */
    this.setLocation = function(x, y) {
    	if (arguments.length === 2) {
    		location = TwoDimensional.convertPointToInt(arguments[0], arguments[1]);
    	} else if (arguments.length === 1
        		&& arguments[0] instanceof SimpleVector2) {
    		location = TwoDimensional.convertPointToInt(arguments[0].getX(), arguments[0].getY());
    	} else {
        	throw new Error("Invalid # of arguments");
        }
    }
}
