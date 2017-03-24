/**
 * 
 */
//var Hashcode = require("./Hashcode.js");
/**
 * A vertex (plural vertices) or node is the fundamental unit of which graphs
 * are formed.
 * @author DaLoneDrau
 */
function GraphNode() {
    Hashcode.call(this);
    /** the <code>GraphNode</code>'s index. must be >= 0. */
    var index;
    /** the <code>GraphNode</code>'s name. can be null. */
    var name;
    if (arguments.length === 0) {
        index = -1;
        name = null;
    } else if (arguments.length === 1
            && GraphNode.prototype.isPrototypeOf(arguments[0])) {
        index = arguments[0].getIndex();
        name = arguments[0].getName().substr(0);
    } else if (arguments.length === 1) {
        index = arguments[0];
        name = null;
    } else if (arguments.length === 2) {
        name = arguments[0];
        index = arguments[1];
    } else {
    	throw new Error("Invalid # of arguments");
    }
    this.equals = function(obj) {
        var equals = false;
        if (typeof(obj.getIndex) === 'function') {
            if (obj.getIndex() === index) {
                equals = true;
            }
        }
        return equals;
    }
    /**
     * Gets the the {@link GraphNode}'s index.
     * @return <code>int</code>
     */
    this.getIndex = function() {
        return index;
    }
    /**
     * Gets the name.
     * @return {@link char[]}
     */
    this.getName = function() {
        return name;
    }
    /**
     * Sets the the {@link GraphNode}'s index.
     * @param ind the index to set
     */
    this.setIndex = function(ind) {
        index = ind;
    }
    /**
     * Sets the value for the name.
     * @param val the value to set
     */
    this.setName = function(val) {
        name = val;
    }
}