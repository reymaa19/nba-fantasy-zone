import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import login from "./controllers/loginController.js";
import playersController from "./controllers/playersController.js";
import statsController from "./controllers/statsController.js";
import teamsController from "./controllers/teamsController.js";
import fantasyController from "./controllers/fantasyController.js";
import { register } from "./controllers/usersController.js";
import logger from "./middleware/logger.js";
import { readNews } from "./utils/utils.js";

const { HOST_URL, PORT } = process.env;
const __dirname = path.resolve();
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors(), express.json(), logger);

app.get("/", (_, res) => res.send("👋"));
app.post("/api/register", register);
app.post("/api/login", login);

// PLAYERS
app.get("/api/players", playersController.getPlayers);

// STATS
app.get("/api/stats/career/", statsController.getCareer);
app.get("/api/stats/lastSeason/:id", statsController.getLastSeason);
app.get("/api/stats/lastSeason/", statsController.getLastSeason);

// TEAMS
app.post("/api/teams", teamsController.createTeam);
app.get("/api/teams", teamsController.getTeams);
app.get("/api/teams/:user_id", teamsController.getTeam);

// NEWS
app.get("/api/news/:count", async (req, res) => {
	try {
		const count = req.params.count;
		const news = await readNews(count);
		return res.status(200).json(news);
	} catch (err) {
		return err;
	}
});

// FANTASY
app.get("/api/fantasy", fantasyController.getFantasy);

app.listen(PORT, () => console.log(`App running on ${HOST_URL}:${PORT}`));
