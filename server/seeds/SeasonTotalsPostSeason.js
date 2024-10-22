import fs from "fs/promises";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const TABLE_NAME = "SeasonTotalsPostSeason";
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
		SEASON_ID: row[1],
		LEAGUE_ID: row[2],
		TEAM_ID: row[3],
		TEAM_ABBREVIATION: row[4],
		PLAYER_AGE: row[5],
		GP: row[6],
		GS: row[7],
		MIN: row[8],
		FGM: row[9],
		FGA: row[10],
		FG_PCT: row[11],
		FG3M: row[12],
		FG3A: row[13],
		FG3_PCT: row[14],
		FTM: row[15],
		FTA: row[16],
		FT_PCT: row[17],
		OREB: row[18],
		DREB: row[19],
		REB: row[20],
		AST: row[21],
		STL: row[22],
		BLK: row[23],
		TOV: row[24],
		PF: row[25],
		PTS: row[26],
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
        console.log("SeasonTotalsPostSeason", rows.length)
	} catch (error) {
		console.error("Error inserting data:", error);
	}
}

