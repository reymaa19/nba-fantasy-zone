import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getLastSeason = async (req, res) => {
	try {
		const player_id = req.params.id;
		let data = [];

		if (!player_id) {
			data = await knex("SeasonTotalsRegularSeason").where({ season_id: "2023-24" });
		} else {
			data = await knex("SeasonTotalsRegularSeason").where({ player_id, season_id: "2023-24" });
		}

		if (data.length === 0) {
			return res.status(404).json({ error: "Stats not found" });
		}

		return res.status(200).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Failed to fetch stats" });
	}
};

export const getCareer = async (_req, res) => {
	try {
		const careers = await knex("CareerTotalsRegularSeason");

		if (careers.length === 0) {
			return res.status(404).json({ error: "Stats not found" });
		}

		return res.status(200).json(careers);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Failed to fetch stats" });
	}
};

export default { getCareer, getLastSeason };
