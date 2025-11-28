import fs from "fs";
import { TABLE_SIZE, LEFT, RIGHT, MOVE_X, MOVE_Y } from "./constants.js";

const args = process.argv.slice(2);

// Robot position and direction initialization
let current_location_x = null;
let current_location_y = null;
let current_direction = null;

const isRobotPlaced = () => {
	return (
		current_location_x !== null &&
		current_location_y !== null &&
		current_direction !== null
	);
};

const isValidPosition = (new_location_x, new_location_y) => {
	return (
		new_location_x >= 0 &&
		new_location_x < TABLE_SIZE &&
		new_location_y >= 0 &&
		new_location_y < TABLE_SIZE
	);
};

const validatePlaceCommand = (cmd) => {
	const placeMatch = cmd.match(
		/^PLACE\s+(\d+)\s*,\s*(\d+)\s*,\s*(NORTH|SOUTH|EAST|WEST)$/
	);
	if (!placeMatch) {
		console.error(
			"Invalid PLACE command format. Format: PLACE X,Y,F (e.g., PLACE 0,0,NORTH)"
		);
		return false;
	}
	return true;
};

const executeCommand = (command) => {
	const cmd = command.trim().toUpperCase();

	if (cmd.startsWith("PLACE")) {
		if (!validatePlaceCommand(cmd)) {
			return false;
		}

		const [x, y, direction] = cmd.split(" ")[1].split(",");
		current_location_x = parseInt(x);
		current_location_y = parseInt(y);
		current_direction = direction;
		return false;
	}
	if (!isRobotPlaced()) {
		return false;
	}

	switch (cmd) {
		case "MOVE":
			const new_location_x = current_location_x + MOVE_X[current_direction];
			const new_location_y = current_location_y + MOVE_Y[current_direction];
			if (isValidPosition(new_location_x, new_location_y)) {
				current_location_x = new_location_x;
				current_location_y = new_location_y;
			}
			return false;

		case "LEFT":
			current_direction = LEFT[current_direction];
			return false;

		case "RIGHT":
			current_direction = RIGHT[current_direction];
			return false;

		case "REPORT":
			console.log(
				`Output: ${current_location_x},${current_location_y},${current_direction}`
			);
			return true;

		default:
			return false;
	}
};

if (args.length !== 1) {
	console.error("Usage: node index.js <input_file>");
	process.exit(1);
}

const inputFile = args[0];

if (!fs.existsSync(inputFile)) {
	console.error(`File ${inputFile} does not exist`);
	process.exit(1);
}

const fileContent = fs.readFileSync(inputFile, "utf8");
const lines = fileContent.split("\n");

for (const line of lines) {
	executeCommand(line);
}
