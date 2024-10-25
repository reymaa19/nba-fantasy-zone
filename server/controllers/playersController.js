import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getPlayers = async (_req, res) => {
	try {
		const players = await knex("Players");

		if (players.length === 0) {
			return res.status(404).json({ error: "Players not found" });
		}

		res.status(200).json(
			players.map((player) => ({ ...player, image_path: "http://localhost:8080/" + player.image_path })),
		);
	} catch (err) {}
};

export default { getPlayers };
