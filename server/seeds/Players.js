import fs from "fs/promises";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const TABLE_NAME = "Players";
	let data;

	try {
		data = JSON.parse(await fs.readFile("data/players_with_images.json", "utf8"));
	} catch (error) {
		console.error("Error reading or parsing data.json:", error);
		return;
	}

	await knex(TABLE_NAME).del();

	const rows = data.map((player) => ({
		id: player.id,
		full_name: player.full_name,
		first_name: player.first_name,
		last_name: player.last_name,
		player_slug: player.player_slug,
		height: player.height,
		weight: player.weight,
		position: player.position,
		jersey: player.jersey,
		image_path: player.image_path,
	}));

	try {
		await knex(TABLE_NAME).insert(rows);
		console.log("Players", rows.length);
	} catch (error) {
        console.error(error)
	}
}
