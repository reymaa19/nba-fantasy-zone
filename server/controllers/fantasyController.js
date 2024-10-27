import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getFantasy = async (_req, res) => {
	try {
		const currentFantasySeason = await knex("CurrentFantasySeason");

		if (currentFantasySeason.length === 0) {
			return res.status(404).json({ error: "Stats not found" });
		}

		return res.status(200).json(currentFantasySeason);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Failed to fetch stats" });
	}
};

export default { getFantasy };
