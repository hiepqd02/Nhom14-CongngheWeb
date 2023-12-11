const createRandomHexColor = () => {
	const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
	let hex = '#';

	for (let i = 0; i < 6; i++) {
		const index = Math.floor(Math.random() * values.length);
		hex += values[index];
	}
	return hex.toString();
};


module.exports = {
    createRandomHexColor
}