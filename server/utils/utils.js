import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read the current news from the JSON file
export async function readNews(count) {
	try {
		const filePath = path.resolve(__dirname, "../data/current_news.json");
		const data = await fs.readFile(filePath, "utf-8");
		const news = JSON.parse(data);
		return news.slice(0, count);
	} catch (err) {
		console.error(err);
		return err;
	}
}
