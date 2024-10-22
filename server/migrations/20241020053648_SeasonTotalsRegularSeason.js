/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
	return knex.schema.createTable("SeasonTotalsRegularSeason", (table) => {
		table.uuid("ID").primary().defaultTo(knex.raw("(UUID())"));
		table.integer("PLAYER_ID").notNullable();
		table.string("SEASON_ID", 10).notNullable();
		table.string("LEAGUE_ID", 10).notNullable();
		table.integer("TEAM_ID").notNullable();
		table.string("TEAM_ABBREVIATION", 5).notNullable();
		table.integer("PLAYER_AGE").notNullable();
		table.integer("GP").notNullable();
		table.integer("GS").notNullable();
		table.float("MIN").defaultTo(0);
		table.float("FGM").notNullable();
		table.float("FGA").notNullable();
		table.float("FG_PCT").notNullable();
		table.float("FG3M").notNullable();
		table.float("FG3A").notNullable();
		table.float("FG3_PCT").notNullable();
		table.float("FTM").notNullable();
		table.float("FTA").notNullable();
		table.float("FT_PCT").notNullable();
		table.float("OREB").notNullable();
		table.float("DREB").notNullable();
		table.float("REB").notNullable();
		table.float("AST").notNullable();
		table.float("STL").notNullable();
		table.float("BLK").notNullable();
		table.float("TOV").notNullable();
		table.float("PF").notNullable();
		table.float("PTS").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema.dropTable("SeasonTotalsRegularSeason");
};
