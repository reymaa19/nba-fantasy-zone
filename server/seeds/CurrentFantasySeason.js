import fs from "fs/promises";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const TABLE_NAME = "CurrentFantasySeason";
	let data;
	let activePlayers = [];

	try {
		data = JSON.parse(await fs.readFile("data/current_fantasy.json", "utf8"));
		const result = JSON.parse(await fs.readFile("data/active_players_info.json"));
		activePlayers = result.map((player) => player.id);
	} catch (error) {
		console.error("Error reading or parsing current_fantasy.json:", error);
		return;
	}

	await knex(TABLE_NAME).del();

	const rows = data[0].rowSet
		.map((row) => {
			if (activePlayers.includes(row[0])) {
				const playerData = {
					PLAYER_ID: row[0],
					PLAYER_NAME: row[1],
					PLAYER_POSITION: row[2],
					TEAM_ID: row[3],
					TEAM_ABBREVIATION: row[4],
					GP: row[5],
					MIN: row[6],
					FAN_DUEL_PTS: row[7],
					NBA_FANTASY_PTS: row[8],
					PTS: row[9],
					REB: row[10],
					AST: row[11],
					BLK: row[12],
					STL: row[13],
					TOV: row[14],
					FG3M: row[15],
					FGA: row[16],
					FG_PCT: row[17],
					FTA: row[18],
					FT_PCT: row[19],
				};
				if (!playerData.PLAYER_NAME) {
					console.table(row);
					return null; // Return null to filter out this row
				}
				return playerData;
			}
		})
		.filter(Boolean); // Filter out undefined and null values

	try {
		await knex(TABLE_NAME).insert(rows);
		console.log(TABLE_NAME, rows.length);
	} catch (error) {
		console.error("Error inserting data:", error);
	}
}
