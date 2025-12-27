import axios from 'axios';

// TODO:
export const apiClient = axios.create({ baseURL: process.env.API_BASE_URL });
