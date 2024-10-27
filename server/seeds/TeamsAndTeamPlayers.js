/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const TABLE_NAME = "Teams";

	await knex(TABLE_NAME).del();

	const JeePeeTee = {
		players: [
			"203999",
			"1629029",
			"203507",
			"201939",
			"203076",
			"1626164",
			"1627734",
			"202710",
			"202695",
			"202331",
			"1629027",
			"1629627",
		],
		user: "4528fca7-7307-4715-8f4c-25397851425c",
	};

	const Claude = {
		players: [
			"1628983",
			"1630169",
			"203954",
			"1628369",
			"1630162",
			"1641705",
			"1628378",
			"1628389",
			"1628368",
			"1630567",
			"1630178",
			"1628969",
		],
		user: "4494a6f0-9284-11ef-a6aa-309c23dfe57e",
	};

	const rows = [JeePeeTee, Claude];

	for (const userTeam of rows) {
		await knex("Teams").insert({ user_id: userTeam.user });

		const team = await knex("Teams").where({ user_id: userTeam.user }).first();
		const teamId = team.id;

		const teamPlayers = userTeam.players.map((player_id) => ({
			team_id: teamId,
			player_id,
		}));

		await knex("TeamPlayers").insert(teamPlayers);
	}

	console.log(TABLE_NAME, rows.length);
	console.log("TeamPlayers", JeePeeTee.players.length + Claude.players.length);
}
