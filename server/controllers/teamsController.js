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

export const register = async (req, res) => {
	try {
		const { username, email, password, confirmPassword } = req.body;
		const error = {};

		if (!username) error.username = "Username is required";
		if (!email) error.email = "Email is required";
		if (!password) error.password = "Password is required";
		if (!confirmPassword) error.password = "Confirm Password is required";

		if (Object.entries(error).length > 0) return res.status(401).json({ error });

		if (password !== confirmPassword)
			return res.status(401).json({ error: { confirmPassword: "Passwords must match" } });

		const password_hash = await bcrypt.hash(password, 10);

		const user = {
			username,
			email,
			password_hash,
		};

		const result = await knex("users").insert(user);

		if (result[0] === 0) {
			const user = await knex("users").where({ username }).first();
			const userForToken = { username, id: user.id };

			const token = jwt.sign(userForToken, process.env.SECRET, {
				expiresIn: 60 * 60,
			});

			return res.status(201).send({ token, username });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err });
	}
};

export default { getPlayers };
