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

export const getTeam = async () => {
	try {
		const user_id = JSON.parse(window.localStorage.getItem("user"))?.id;
		if (!user_id) return [];
		const response = await axios.get(`${BASE_URL}/api/teams/${user_id}`);
		return response;
	} catch (err) {
		return err;
	}
};

export const getTeams = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/api/teams`);
		return response;
	} catch (err) {
		return err;
	}
};

export default { createTeam, getTeam, getTeams };
