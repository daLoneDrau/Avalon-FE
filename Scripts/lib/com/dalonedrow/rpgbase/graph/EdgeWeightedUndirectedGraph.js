/**
 * A Graph is a set of vertices and a collection of edges that each connect a
 * pair of vertices. An undirected graph is a graph where all edges are
 * bidirectional.
 * @author drau
 */
function EdgeWeightedUndirectedGraph() {
    Hashcode.call(this);
    /** the graph's set of edges. */
    var edges;
    /** the graph's set of vertices. */
    var vertices;
    if (arguments.length === 1
            && arguments[0] instanceof EdgeWeightedUndirectedGraph) {
        vertices = [];
        for (var i = 0, len = arguments[0].getVertices().length; i < len; i++) {
            vertices.push(new GraphNode(arguments[0].getVertices()[i]));
        }
        edges = [];
        for (var i = 0, len = arguments[0].getEdges().length; i < len; i++) {
            edges.push(new WeightedGraphEdge(arguments[0].getEdges()[i]));
        }
    } else if (arguments.length === 1
            && parseInt(arguments[0]) === parseInt(arguments[0])) {
        vertices = [];
        for (var i = 0; i < arguments[0]; i++) {
            vertices.push(new GraphNode(i));
        }
        edges = [];
    } else {
        throw new Error("Invalid # of arguments");
    }
    /**
     * Adds edge v-w to this graph.
     */
    this.addEdge = function() {
        var v, w, c;
        if (arguments.length === 1
                && WeightedGraphEdge.prototype.isPrototypeOf(arguments[0])) {
            v = arguments[0].getFrom();
            w = arguments[0].getTo();
            c = arguments[0].getCost();
        } else if (arguments.length === 2) {
            v = arguments[0];
            w = arguments[1];
            c = 1;
        } else if (arguments.length === 3) {
            v = arguments[0];
            w = arguments[1];
            c = arguments[2];
        } else {
            throw new Error("Invalid # of arguments");
        }
        if (!this.hasEdge(v, w)) {
            if (!this.hasVertex(v)) {
                this.addVertex(v);
            }
            if (!this.hasVertex(w)) {
                this.addVertex(w);
            }
            edges.push(new WeightedGraphEdge(v, w, c));
        }
    }
    /**
     * Adds a vertex to the graph.
     */
    this.addVertex = function() {
        if (arguments.length === 1
                && GraphNode.prototype.isPrototypeOf(arguments[0])) {
            vertices.push(arguments[0]);
        } else if (arguments.length === 1) {
            vertices.push(new GraphNode(arguments[0]));
        } else {
            throw new Error("Invalid # of arguments");
        }
    }
    /**
     * Gets the set of all vertices adjacent to vertex v.
     * @param v vertex v
     * @return <code>int</code>[]
     */
    this.getAdjacencies = function(v) {
        var adjacencies = [];
        for (var i = edges.length - 1; i >= 0; i--) {
            if (edges[i].getFrom() === v) {
                adjacencies.push(edges[i].getTo());
            } else if (edges[i].getTo() == v) {
                adjacencies.push(edges[i].getFrom());
            }
        }
        return adjacencies;
    }
    /**
     * Gets the edge at a specific index.
     * @param index the index
     * @return {@link WeightedGraphEdge}
     */
    this.getEdge = function(index) {
        return edges[index];
    }
    /**
     * Gets the graph's number of edges.
     * @return <code>int</code>
     */
    this.getNumberOfEdges = function() {
        return edges.length;
    }
    /**
     * Gets the graph's number of vertices.
     * @return <code>int</code>
     */
    this.getNumberOfVertices = function() {
        return vertices.length;
    }
    /**
     * Gets a vertex by its id.
     * @param id the vertex' id
     * @return {@link GraphNode}
     */
    this.getVertex = function(id) {
        var v = null;
        for (var i = vertices.length - 1; i >= 0; i--) {
            if (vertices[i].getIndex() === id) {
                v = vertices[i];
                break;
            }
        }
        return v;
    }
    /**
     * Gets the directed edges incident from vertex <tt>v</tt>.
     * @param v vertex v
     * @return {@link WeightedGraphEdge}[]
     */
    this.getVertexAdjacencies = function(v) {
        var adj = [];
        for (var i = edges.length - 1; i >= 0; i--) {
            if (edges[i].getFrom() == v || edges[i].getTo() == v) {
                adj.push(edges[i]);
            }
        }
        return adj;
    }
    /**
     * Determines if edge v-w exists on the graph.
     * @param v vertex v
     * @param w vertex w
     * @return true if edge v-w exists; false otherwise
     */
    this.hasEdge = function(v, w) {
        var exists = false;
        if (arguments.length === 2) {
            for (var i = edges.length - 1; i >= 0; i--) {
                if (edges[i].getFrom() === arguments[0]
                        && edges[i].getTo() === arguments[1]) {
                    exists = true;
                    break;
                }
                if (edges[i].getFrom() === arguments[1]
                        && edges[i].getTo() === arguments[0]) {
                    exists = true;
                    break;
                }
            }
        } else if (arguments.length === 1
                && arguments[0] instanceof WeightedGraphEdge) {
            for (var i = edges.length - 1; i >= 0; i--) {
                if (edges[i].equalsUndirected(arguments[0])) {
                    exists = true;
                    break;
                }
            }
        } else {
            throw new Error("Invalid # of arguments");
        }
        return exists;
    }
    /**
     * Determines if vertex v exists in the graph.
     * @param vertexId the id of vertex v
     * @return true if vertex v exists; false otherwise
     */
    this.hasVertex = function(vertexId) {
        var exists = false;
        for (var i = vertices.length - 1; i >= 0; i--) {
            if (vertices[i].getIndex() === vertexId) {
                exists = true;
                break;
            }
        }
        return exists;
    }
    /**
     * Removes edge v-w from the set of edges.
     * @param v vertex v
     * @param w vertex w
     * @return true if the edge was removed; false otherwise
     */
    this.removeEdge = function(v, w) {
        var removed = false;
        if (this.hasEdge(v, w)) {
            var i;
            for (i = edges.length - 1; i >= 0; i--) {
                if (edges[i].equalsUndirected(v, w)) {
                    break;
                }
            }
            removed = true;
            edges.splice(i, 1);
        }
        return removed;
    }
    this.getEdges = function() {
        return edges;
    }
    this.getVertexes = function() {
        return vertices;
    }
}
