/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
	return knex.schema.createTable("CurrentFantasySeason", (table) => {
		table.uuid("ID").primary().defaultTo(knex.raw("(UUID())"));
		table.uuid("PLAYER_ID").notNullable();
		table.string("PLAYER_NAME", 255).defaultTo("");
		table.string("PLAYER_POSITION", 10).defaultTo("");
		table.integer("TEAM_ID").defaultTo(0);
		table.string("TEAM_ABBREVIATION", 5).defaultTo("");
		table.integer("GP").notNullable();
		table.float("MIN", 8, 2).defaultTo(0);
		table.float("FAN_DUEL_PTS", 8, 2).defaultTo(0);
		table.float("NBA_FANTASY_PTS", 8, 2).defaultTo(0);
		table.float("PTS", 8, 2).notNullable();
		table.float("REB", 8, 2).notNullable();
		table.float("AST", 8, 2).notNullable();
		table.float("BLK", 8, 2).notNullable();
		table.float("STL", 8, 2).notNullable();
		table.float("TOV", 8, 2).notNullable();
		table.float("FG3M", 8, 2).notNullable();
		table.float("FGA", 8, 2).notNullable();
		table.float("FG_PCT", 8, 2).notNullable();
		table.float("FTA", 8, 2).notNullable();
		table.float("FT_PCT", 8, 2).notNullable();

		table.foreign("PLAYER_ID").references("id").inTable("Players").onUpdate("CASCADE").onDelete("CASCADE");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema.dropTable("CurrentFantasySeason");
};
