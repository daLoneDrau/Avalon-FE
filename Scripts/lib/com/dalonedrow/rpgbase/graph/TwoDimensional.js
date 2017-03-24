/**
 * A class representing a 2-dimensional point that is stored as an int.
 * @author drau
 *
 */
function TwoDimensional() {
    Hashcode.call(this);
}
/**
 * Converts an integer value to a {@link SimplePoint}.
 * @param val the integer
 * @return {@link SimpleVector2}
 */
TwoDimensional.convertIntToVector = function(val) {
	var sixteen = 16, shift = 0xffff;
	return new SimpleVector2(val >>> sixteen, val & shift);
}
	/**
	 * Converts a coordinate to an integer.
	 * @param x the x-coordinate value
	 * @param y the y-coordinate value
	 * @return <code>int</code>
	 */
TwoDimensional.convertPointToInt = function(x, y) {
	var sixteen = 16;
	var val = x << sixteen;
	val += y;
	return val;
}
