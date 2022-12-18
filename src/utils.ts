/**
 * A linear interpolator for hexadecimal colors
 * @example
 * // returns #7F7F7F
 * lerpColor('#000000', '#ffffff', 0.5)
 */
export function lerpColor(a: string, b: string, amount: number) {
	var ah = parseInt(a.replace(/#/g, ""), 16),
		ar = ah >> 16,
		ag = (ah >> 8) & 0xff,
		ab = ah & 0xff,
		bh = parseInt(b.replace(/#/g, ""), 16),
		br = bh >> 16,
		bg = (bh >> 8) & 0xff,
		bb = bh & 0xff,
		rr = ar + amount * (br - ar),
		rg = ag + amount * (bg - ag),
		rb = ab + amount * (bb - ab);

	return "#" + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
}
