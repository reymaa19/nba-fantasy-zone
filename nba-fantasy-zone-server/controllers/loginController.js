import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await knex("users").where({ username }).first();

    const correctPassword =
      user === null
        ? false
        : await bcrypt.compare(password, user.password_hash);

    if (!(user && correctPassword))
      return req.status(401).json({ error: "Invalid Username or Password" });

    const userForToken = { username, id: user.id };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    return res.status(200).send({ token, username });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: err });
  }
}

export default login;
