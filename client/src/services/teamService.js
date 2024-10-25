
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

//let _token = null;
//
//const setToken = (newToken) => (_token = `Bearer ${newToken}`);

export const createTeam = async (newTeam) => {
	try {
		const response = await axios.post(`${BASE_URL}/api/teams`, newTeam);
		return response;
	} catch (err) {
		return err;
	}
};

export default { getAllLastSeason };
