import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

let _token = null;

const setToken = (newToken) => (_token = `Bearer ${newToken}`);

const getAllPlayers = async () => {
  try {
    const request = await axios.get(`${BASE_URL}/players`);
    return request.data;
  } catch (err) {
    return err;
  }
};

export default { getAllPlayers, setToken };
