import axios from "axios";
import { config } from "@/src/config/config";

const api = axios.create({
  baseURL: config.apiUrl,
});

export default api;