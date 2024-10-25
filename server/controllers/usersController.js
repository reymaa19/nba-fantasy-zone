import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

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

export default { register };
