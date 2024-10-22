import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import login from "./controllers/loginController.js";
import { createUser } from "./controllers/userController.js";
import logger from "./middleware/logger.js";

const { HOST_URL, PORT } = process.env;
const __dirname = path.resolve();
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors(), express.json(), logger);

app.get("/", (_, res) => res.send("👋"));
app.post("/users", createUser);
app.post("/login", login);

app.listen(PORT, () => console.log(`App running on ${HOST_URL}:${PORT}`));
