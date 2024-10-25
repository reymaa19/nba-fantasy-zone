import fs from "fs/promises";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const TABLE_NAME = "Players";
	let data;
	const rows = [];

	try {
		data = JSON.parse(await fs.readFile("data/active_players_info.json", "utf8"));
	} catch (error) {
		console.error("Error reading or parsing data.json:", error);
		return;
	}

	await knex(TABLE_NAME).del();

	const images = await fs.readdir("public/player_images");
	const imageNames = images.map((image) => Number(image.split(".")[0]));

	data.forEach((player) => {
		if (imageNames.includes(player.id))
			rows.push({
				id: player.id,
				full_name: player.full_name,
				first_name: player.first_name,
				last_name: player.last_name,
				player_slug: player.player_slug,
				height: player.height,
				weight: player.weight,
				position: player.position,
				jersey: player.jersey,
				image_path: `public/player_images/${player.id}.png`,
			});
        else print("No image for", player.full_name);
	});

	try {
		await knex(TABLE_NAME).insert(rows);
		console.log("Players", rows.length);
	} catch (error) {
		console.error(error);
	}
}
