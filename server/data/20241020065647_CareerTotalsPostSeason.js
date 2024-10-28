/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
    // CURRENTLY NOT BEING USED BUT WILL BE IN FUTURE IMPLEMENTATION
	return knex.schema.createTable("CareerTotalsPostSeason", (table) => {
		table.uuid("ID").primary().defaultTo(knex.raw("(UUID())"));
		table.uuid("PLAYER_ID").notNullable();
		table.string("LEAGUE_ID", 10).notNullable();
		table.integer("TEAM_ID", 8, 2).notNullable();
		table.integer("GP").notNullable();
		table.integer("GS").notNullable();
		table.float("MIN", 8, 2).defaultTo(0);
		table.float("FGM", 8, 2).notNullable();
		table.float("FGA", 8, 2).notNullable();
		table.float("FG_PCT", 8, 2).notNullable();
		table.float("FG3M", 8, 2).notNullable();
		table.float("FG3A", 8, 2).notNullable();
		table.float("FG3_PCT", 8, 2).notNullable();
		table.float("FTM", 8, 2).notNullable();
		table.float("FTA", 8, 2).notNullable();
		table.float("FT_PCT", 8, 2).notNullable();
		table.float("OREB", 8, 2).notNullable();
		table.float("DREB", 8, 2).notNullable();
		table.float("REB", 8, 2).notNullable();
		table.float("AST", 8, 2).notNullable();
		table.float("STL", 8, 2).notNullable();
		table.float("BLK", 8, 2).notNullable();
		table.float("TOV", 8, 2).notNullable();
		table.float("PF", 8, 2).notNullable();
		table.float("PTS", 8, 2).notNullable();

		table.foreign("PLAYER_ID").references("id").inTable("Players").onUpdate("CASCADE").onDelete("CASCADE");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema.dropTable("CareerTotalsPostSeason");
};
