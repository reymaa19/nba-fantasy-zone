import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username)
      return res.status(401).json({ error: "Username is required" });
    if (!email) return res.status(401).json({ error: "Email is required" });
    if (!password)
      return res.status(401).json({ error: "Password is required" });
    if (password !== confirmPassword)
      return res.status(401).json({ error: "Passwords must match" });

    const password_hash = await bcrypt.hash(password, 10);

    const user = {
      username,
      email,
      password_hash,
    };

    await knex("users").insert(user);

    res.status(201);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err });
  }
}

export default { createUser };
