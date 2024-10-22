import { exec } from "child_process";

// "scrape-players": "node scripts/run-scrape-players.js",

exec("python3 ./server/utils/scrape/scrape-players.py", (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing script: ${error.message}`);
        process.exit(1);
    }
    if (stderr) {
        console.error(`Script error: ${stderr}`);
        process.exit(1);
    }
    console.log(`Script output: ${stdout}`);
    process.exit(0);
});