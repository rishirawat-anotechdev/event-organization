import axios from "axios";

 const API = axios.create({
  baseURL: `https://manaliclub.online/api/v1`,  
  withCredentials: true,
});

export default API;
