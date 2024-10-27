import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			if (!username && password) return res.status(401).json({ error: "Username is required" });
			if (username && !password) return res.status(401).json({ error: "Password is required" });
			return res.status(401).json({ error: "Username and Password is required" });
		}

		const user = await knex("users").where({ username }).first();

		if (!user) return res.status(401).json({ password: "Username or Password is invalid" });

		const correctPassword = user === null ? false : await bcrypt.compare(password, user.password_hash);

		if (!correctPassword) return res.status(401).json({ password: "Username or Password is invalid" });

		const userForToken = { username, id: user.id };

		const token = jwt.sign(userForToken, process.env.SECRET, {
			expiresIn: 60 * 60,
		});

		return res.status(200).send({ ...userForToken, token });
	} catch (err) {
		console.error(err);
		return res.status(500).send({ error: err });
	}
};

export default login;
