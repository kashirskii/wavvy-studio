import axios from 'axios';

export const authenticatedClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

authenticatedClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}
)

export default authenticatedClient;