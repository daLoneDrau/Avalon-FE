/**
 * A Graph is a set of vertices and a collection of edges that each connect a
 * pair of vertices. An undirected graph is a graph where all edges are
 * bidirectional.
 * @author drau
 */
function WeightedGraphEdge() {
    Hashcode.call(this);
	/** the cost of traversing the <code>GraphEdge</code>. */
	var cost;
	if (arguments.length === 1
			&& arguments[0] instanceof WeightedGraphEdge) {
		GraphEdge.call(this, arguments[0].getFrom(), arguments[0].getTo());
	} else if (arguments.length === 3) {
		GraphEdge.call(this, arguments[0], arguments[1]);
		cost = arguments[2];
	}
	/**
	 * Gets the cost of traversing the {@link WeightedGraphEdge}.
	 * @return <code>double</code>
	 */
	this.getCost = function() {
		return cost;
	}
	/**
	 * Sets the cost of traversing the {@link WeightedGraphEdge}.
	 * @param c the cost to set
	 */
	this.setCost = function(c) {
		cost = c;
	}
}
WeightedGraphEdge.prototype = Object.create(GraphEdge.prototype);
WeightedGraphEdge.prototype.constructor = WeightedGraphEdge;
