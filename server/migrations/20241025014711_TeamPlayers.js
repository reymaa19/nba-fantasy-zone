/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
	return knex.schema.createTable("TeamPlayers", (table) => {
		table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
		table.uuid("team_id").notNullable();
		table.uuid("player_id").notNullable();
		table.foreign("team_id").references("id").inTable("Teams").onUpdate("CASCADE").onDelete("CASCADE");
		table.foreign("player_id").references("id").inTable("Players").onUpdate("CASCADE").onDelete("CASCADE");
		table.primary(["team_id", "player_id"]);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema.dropTable("TeamPlayers");
};
