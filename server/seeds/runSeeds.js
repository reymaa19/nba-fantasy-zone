import knex from "knex";
import configuration from "../knexfile.js";

const db = knex(configuration);

async function runSeeds() {
	try {
		// Run the Players seed file first
		await db.seed.run({
			specific: "Players.js",
		});

		// Run CareerTotalsRegularSeason seed file
		await db.seed.run({
			specific: "CareerTotalsRegularSeason.js",
		});

		// Run SeasonTotalsRegularSeason seed file
		await db.seed.run({
			specific: "SeasonTotalsRegularSeason.js",
		});

		// Run Users seed file
		await db.seed.run({
			specific: "Users.js",
		});

		// Run TeamsAndTeamPlayers seed file
		await db.seed.run({
			specific: "Teams.js",
		});

        await db.seed.run({
            specific: "CurrentFantasySeason.js",
        });

		console.log("All seeds ran successfully");
	} catch (error) {
		console.error("Error running seeds:", error);
	} finally {
		await db.destroy();
	}
}

runSeeds();
