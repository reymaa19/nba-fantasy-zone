import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const register = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, credentials);
    return response;
  } catch (err) {
    return err;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response;
  } catch (err) {
    return err;
  }
};

export default { register, login };
