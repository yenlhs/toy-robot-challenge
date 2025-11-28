const fs = require("fs");
const args = process.argv.slice(2);

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
	console.log(line);
}
