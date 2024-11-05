import axios from "axios";

 const API = axios.create({ 
  baseURL: `https://event-organization-server.onrender.com/api/v1`,  
  withCredentials: true,
});

export default API;
