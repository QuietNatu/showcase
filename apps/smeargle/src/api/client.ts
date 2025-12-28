import axios from 'axios';

// TODO: move gen code inside api? https://feature-sliced.design/docs/guides/examples/api-requests

// TODO:
export const apiClient = axios.create({ baseURL: process.env.API_BASE_URL });
