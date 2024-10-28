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

export const getTeam = async (req, res) => {
	try {
		const user_id = req.params.user_id;

		const team = await knex("Teams").where({ user_id }).first();

		if (!team) {
			return res.status(400).json({ error: "Team does not exist" });
		}

		const teamPlayers = await knex("TeamPlayers").where({ team_id: team.id });

		const playerPromises = teamPlayers.map((teamPlayer) => {
			return knex("Players").where({ id: teamPlayer.player_id }).first();
		});

		const players = await Promise.all(playerPromises);

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
		const usersPromises = teams.map((team) => knex("Users").where({ id: team.user_id }).first());
		const users = await Promise.all(usersPromises);

		// Get all the teams players using team_id
		const allTeamPlayersPromises = teams.map((team) => {
			return knex("TeamPlayers").where({ team_id: team.id });
		});

		const eachTeamAndTheirPlayers = await Promise.all(allTeamPlayersPromises);

		// Get all the players and put them into their appropriate team
		const allPlayersInEachTeamPromises = eachTeamAndTheirPlayers.map((team) =>
			team.map((teamPlayer) => {
				return knex("Players").where({ id: teamPlayer.player_id }).first();
			})
		);

		const allPlayersInEachTeam = await Promise.all(
			allPlayersInEachTeamPromises.map((teamPromises) => Promise.all(teamPromises))
		);

		const usernamesAndTheirPlayers = users.map((user, index) => ({
			username: user.username,
			players: allPlayersInEachTeam[index],
		}));

		return res.status(200).json(usernamesAndTheirPlayers);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err });
	}
};

export default { createTeam, getTeam, getTeams };
