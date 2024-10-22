import fs from "fs/promises";
import * as fuzzball from "fuzzball";
import path from "path";
import { fileURLToPath } from "url";

/*
This file matches player images with active players and updates 
their information with the corresponding image paths. 
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLAYER_IMAGES_DIR = path.join(__dirname, "../public/player_images");
const ACTIVE_PLAYERS_FILE = path.join(__dirname, "../data/active_players_info.json");

// Read the player images directory and active players file
async function getPlayerImages() {
	try {
		const files = await fs.readdir(PLAYER_IMAGES_DIR);
		return files.filter((file) => file.endsWith(".jpg"));
	} catch (error) {
		console.error("Error reading player images directory:", error);
		return [];
	}
}

// Read the active players file
async function getActivePlayers() {
	try {
		const data = await fs.readFile(ACTIVE_PLAYERS_FILE, "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.error("Error reading active players file:", error);
		return [];
	}
}

/**
 * Find the best match for a player's name in a list of image filenames.
 * @param {Object} player - The player object with name information.
 * @param {string[]} images - The list of image filenames to match against.
 * @returns {string} The best matching image filename.
 */
function findBestMatch(player, images) {
	const options = {
		scorer: fuzzball.partial_ratio,
		processor: (choice) => choice.toLowerCase().replace(/[^a-z0-9]/g, ""),
	};

	const namesToMatch = [
		player.full_name,
		`${player.first_name}_${player.last_name}`,
		`${player.first_name} ${player.last_name}`,
	];

	let bestMatch = null;
	let highestScore = 0;

	for (const name of namesToMatch) {
		const result = fuzzball.extract(name, images, options);
		if (result[0][1] > highestScore) {
			highestScore = result[0][1];
			bestMatch = result[0][0];
		}
	}

	return bestMatch;
}

// Match player images with active players and update their information
async function matchPlayerImages() {
	const images = await getPlayerImages();
	const players = await getActivePlayers();

	for (const player of players) {
		const bestMatch = findBestMatch(player, images);
		if (bestMatch) {
			player.image_path = path.join("public/player_images", bestMatch);
		} else {
			player.image_path = null;
		}
	}

	try {
		await fs.writeFile(
			"data/players_with_images.json",
			JSON.stringify(players, null, 4)
		);
		console.log("Updated active players with image paths.");
	} catch (error) {
		console.error("Error writing updated active players file:", error);
	}
}

matchPlayerImages();
