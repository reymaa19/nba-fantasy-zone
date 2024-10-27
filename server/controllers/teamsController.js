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

export const getTeams = async (_req, res) => {
	try {
		// Gets all the teams
		const teams = await knex("Teams");
		const usersPromises = teams.map(async (team) => await knex("Users").where({ id: team.user_id }).first());
		const users = await executePromises(usersPromises);

		console.log(users);
		// Get all the teams players using team_id
		const allTeamPlayers = teams.map((team) => {
			return new Promise(async (resolve, reject) => {
				try {
					resolve(await knex("TeamPlayers").where({ team_id: team.id }));
				} catch (err) {
					reject(err);
				}
			});
		});

		const eachTeamAndTheirPlayers = await executePromises(allTeamPlayers);

		// Get all the players and put them into their appropriate team
		const allPlayersInEachTeam = eachTeamAndTheirPlayers.map((team) =>
			team.map((teamPlayer) => {
				return new Promise(async (resolve, reject) => {
					try {
						resolve(await knex("Players").where({ id: teamPlayer.player_id }).first());
					} catch (err) {
						reject(err);
					}
				});
			}),
		);

		const usernamesAndTheirPlayers = [];

		for (let i = 0; i < teams.length; i++) {
			const result = await executePromises(allPlayersInEachTeam[i]);
			usernamesAndTheirPlayers.push({ username: [users[i].username], players: result });
		}

		return res.status(200).json(usernamesAndTheirPlayers);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err });
	}
};

export default { createTeam, getTeam, getTeams };
