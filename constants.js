const TABLE_SIZE = 5;
const LEFT = {
	NORTH: "WEST",
	WEST: "SOUTH",
	SOUTH: "EAST",
	EAST: "NORTH",
};
const RIGHT = {
	NORTH: "EAST",
	EAST: "SOUTH",
	SOUTH: "WEST",
	WEST: "NORTH",
};
const MOVE_X = {
	NORTH: 0,
	WEST: -1,
	SOUTH: 0,
	EAST: 1,
};
const MOVE_Y = {
	NORTH: 1,
	WEST: 0,
	EAST: 0,
	SOUTH: -1,
};
export { TABLE_SIZE, LEFT, RIGHT, MOVE_X, MOVE_Y };
