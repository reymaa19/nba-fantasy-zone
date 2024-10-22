/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
	return knex.schema.createTable("Users", (table) => {
		table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
		table.string("username", 255).notNullable().unique();
		table.string("email", 255).notNullable().unique();
		table.string("password_hash", 255).notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema.dropTable("Users");
};
