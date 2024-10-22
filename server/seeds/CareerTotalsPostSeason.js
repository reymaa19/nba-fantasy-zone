import fs from "fs/promises";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const TABLE_NAME = "CareerTotalsPostSeason";
	let data;

	try {
		data = JSON.parse(await fs.readFile("data/data.json", "utf8"));
	} catch (error) {
		console.error("Error reading or parsing data.json:", error);
		return;
	}

	const extractResultSet = (player, type) =>
		player.stats[type].resultSets.find((set) => set.name === TABLE_NAME);

	const totals = data.map((player) => extractResultSet(player, "totals"));
	const averages = data.map((player) => extractResultSet(player, "averages"));

	await knex(TABLE_NAME).del();

	const mapRow = (row) => ({
		PLAYER_ID: row[0],
		LEAGUE_ID: row[1],
		TEAM_ID: row[2],
		GP: row[3],
		GS: row[4],
		MIN: row[5],
		FGM: row[6],
		FGA: row[7],
		FG_PCT: row[8],
		FG3M: row[9],
		FG3A: row[10],
		FG3_PCT: row[11],
		FTM: row[12],
		FTA: row[13],
		FT_PCT: row[14],
		OREB: row[15],
		DREB: row[16],
		REB: row[17],
		AST: row[18],
		STL: row[19],
		BLK: row[20],
		TOV: row[21],
		PF: row[22],
		PTS: row[23],
	});

	const totalsRows = totals.flatMap((resultSet) =>
		resultSet ? resultSet.rowSet.map(mapRow) : []
	);

	const averagesRows = averages.flatMap((resultSet) =>
		resultSet ? resultSet.rowSet.map(mapRow) : []
	);

	const rows = [...totalsRows, ...averagesRows];

	try {
		await knex(TABLE_NAME).insert(rows);
        console.log("CareerTotalsPostSeason", rows.length)
	} catch (error) {
		console.error("Error inserting data:", error);
	}
}

