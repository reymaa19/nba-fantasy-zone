/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
	return knex.schema.createTable("Players", (table) => {
		table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
		table.string("full_name", 255).notNullable();
		table.string("first_name", 255).notNullable();
		table.string("last_name", 255).notNullable();
		table.string("player_slug", 255).notNullable();
		table.string("height", 255).defaultTo("");
		table.string("weight", 255).defaultTo(0);
		table.string("position", 255).defaultTo("");
		table.string("jersey").defaultTo("");
		table.string("image_path", 255).defaultTo("");
		table.boolean("is_TeamPlayer").defaultTo(false);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema.dropTable("Players");
};
