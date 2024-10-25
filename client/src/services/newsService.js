import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getNews = async (count = 12) => {
	try {
		const response = await axios.get(`${BASE_URL}/api/news/${count}`);
		return response;
	} catch (err) {
		return err;
	}
};

export default { getNews };
