/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
	return knex.schema.createTable("Teams", (table) => {
		table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
		table.integer("score").defaultTo(0);
		table.uuid("user_id").notNullable();
		table.foreign("user_id").references("id").inTable("Users").onUpdate("CASCADE").onDelete("CASCADE");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema.dropTableIfExists("Teams");
};
