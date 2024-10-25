import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const createTeam = async (req, res) => {
	try {
		const { user, players } = req.body;

		const userExists = await knex("users").where({ id: user }).first();

		if (!userExists) {
			return res.status(400).json({ error: "User does not exist" });
		}

		// Create a new team
		await knex("Teams").insert({ user_id: user });
		const { id } = await knex("Teams").where({ user_id: user }).first();

		// Create TeamPlayers
		const teamPlayers = players.map((player_id) => ({
			team_id: id,
			player_id,
		}));

		await knex("TeamPlayers").insert(teamPlayers);

		// Update each of the players to be is_TeamPlayer to true
		await knex("Players").whereIn("id", players).update({ is_TeamPlayer: true });

		return res.status(201).json("Success");
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err });
	}
};

const executePromises = async (promises) => {
	const result = await Promise.all(promises);
	return result;
};

export const getTeam = async (req, res) => {
	try {
		const user_id = req.params.user_id;

		const team = await knex("Teams").where({ user_id }).first();

		if (!team) {
			return res.status(400).json({ error: "Team does not exist" });
		}

		const teamPlayers = await knex("TeamPlayers").where({ team_id: team.id });

		const playerPromises = teamPlayers.map((teamPlayer) => {
			return new Promise(async (resolve, reject) => {
				try {
					resolve(await knex("Players").where({ id: teamPlayer.player_id }).first());
				} catch (err) {
					reject(err);
				}
			});
		});

		const players = await executePromises(playerPromises);

		return res.status(200).json(players);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err });
	}
};

export default { createTeam, getTeam };
