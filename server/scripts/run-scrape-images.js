import { exec } from "child_process";

// "scrape-images": "node scripts/run-scrape-images.js",

exec("python3 ./server/utils/scrape/scrape-images.py", (error, stdout, stderr) => {
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