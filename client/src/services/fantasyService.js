import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getFantasy = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/api/fantasy`);
		return response;
	} catch (err) {
		return err;
	}
};

export default { getFantasy };
