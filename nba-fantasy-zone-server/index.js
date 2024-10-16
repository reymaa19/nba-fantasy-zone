import cors from "cors";
import "dotenv/config";
import express from "express";
import login from "./controllers/loginController.js";
import { createUser } from "./controllers/userController.js";
import logger from "./middleware/logger.js";

const { HOST_URL, PORT } = process.env;

const app = express();

app.use(cors(), express.json(), logger);

app.get("/", (_, res) => res.send("👋"));
app.post("/users", createUser);
app.post("/login", login);

app.listen(PORT, () => console.log(`App running on ${HOST_URL}:${PORT}`));
