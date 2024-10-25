import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

//let _token = null;
//
//const setToken = (newToken) => (_token = `Bearer ${newToken}`);

export const getAllLastSeason = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/api/stats/lastSeason`);
		return response;
	} catch (err) {
		return err;
	}
};

export default { getAllLastSeason };
