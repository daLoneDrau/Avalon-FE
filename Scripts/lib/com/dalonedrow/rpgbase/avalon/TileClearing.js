/**
 * 
 */
//var Hashcode = require("./Hashcode.js");
function TileClearing() {
    Hashcode.call(this);
    /** the clearing type (cave, mountain, or woods). */
    var type;
    if (arguments.length === 3
    		&& parseInt(arguments[1]) === parseInt(arguments[1])
    		&& parseInt(arguments[2]) === parseInt(arguments[2])) {
        GraphNode.call(this, arguments[0], arguments[1]);
        type = arguments[2];
    } else if (arguments.length === 2
            && parseInt(arguments[0]) === parseInt(arguments[0])
            && parseInt(arguments[1]) === parseInt(arguments[1])) {
    	GraphNode.call(this, arguments[0]);
        type = arguments[1];
    } else if (arguments.length === 1
            && TileClearing.prototype.isPrototypeOf(arguments[0])) {
    	GraphNode.call(this, arguments[0]);
        type = arguments[0].getType();
    } else if (arguments.length === 1
            && parseInt(arguments[0]) === parseInt(arguments[0])) {
    	GraphNode.call(this);
        type = arguments[0];
    } else {
		throw new Error("Invalid # of arguments");
    }
    /**
     * Gets the clearing number assigned to this clearing (1 thru 6).
     * @return <code>int</code>
     */
    this.getClearingNumber = function() {
        return parseInt(this.getName().charAt(2));
    }
    /**
     * Gets the the clearing type (cave, mountain, or woods).
     * @return <code>int</code>
     */
    this.getType = function() {
        return type;
    }
    this.toString = function() {
        var sb = [];
        sb.push(this.getName());
        sb.push(" ");
        sb.push(this.getIndex());
        return sb.join("");
    }
}
TileClearing.prototype = Object.create(GraphNode.prototype);
TileClearing.prototype.constructor = TileClearing;
