/**
 * An edge is a pair of vertices, ordered or unordered.
 * @author DaLoneDrau
 */
function GraphEdge() {
    Hashcode.call(this);
    /** the index of the 1st of the {@link GraphNode}s this edge connects. */
    var from;
    /** the index of the 2nd of the {@link GraphNode}s this edge connects. */
    var to;
    if (arguments.length === 1
    		&& arguments[0] instanceof GraphEdge) {
    	from = arguments[0].getFrom();
    	to = arguments[0].getTo();
    } else if (arguments.length === 2) {
    	from = arguments[0];
    	to = arguments[1];
    } else {
    	throw new Error("Invalid # of arguments");
    }
    /**
     * Determines if this {@link GraphEdge} connects two nodes exactly in the
     * direction provided.
     * @return true if the {@link GraphEdge} connects two nodes in either
     *         direction; false otherwise
     */
    this.equalsDirected = function() {
    	var is;
        if (arguments.length === 1
        		&& arguments[0] instanceof GraphEdge) {
        	is = from === arguments[0].getFrom() && to === arguments[0].getTo();
        } else if (arguments.length === 2) {
        	is = from === arguments[0] && to === arguments[1];
        } else {
        	throw new Error("Invalid # of arguments");
        }
        return is;
    }
    /**
     * Determines if this {@link GraphEdge} is the same as a second
     * {@link GraphEdge}.
     * @return true if the {@link GraphEdge} connects two nodes in either
     *         direction; false otherwise
     */
    this.equalsUndirected = function() {
        return (from == e.from && to == e.to) || (from == e.to && to == e.from);
    	var is;
        if (arguments.length === 1
        		&& arguments[0] instanceof GraphEdge) {
        	is = (from === arguments[0].getFrom() && to === arguments[0].getTo())
        	|| (from === arguments[0].getTo() && to === arguments[0].getFrom());
        } else if (arguments.length === 2) {
        	is = (from === arguments[0] && to === arguments[1])
        	|| (from === arguments[1] && to === arguments[0]);
        } else {
        	throw new Error("Invalid # of arguments");
        }
        return is;
    }
    /**
     * Gets the index of the 1st {@link GraphNode}s this edge connects.
     * @return <code>int</code>
     */
    this.getFrom = function() {
        return from;
    }
    /**
     * Gets the index of the 2nd {@link GraphNode}s this edge connects.
     * @return <code>int</code>
     */
    this.getTo = function() {
        return to;
    }
    this.toString = function() {
		return ["[from=", from, ",to=", to, "]"].join("");
    }
}
