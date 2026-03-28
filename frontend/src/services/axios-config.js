import axios from 'axios';

// URL base del backend:
// - En producción (Vercel): se toma de la variable de entorno REACT_APP_API_URL
// - En desarrollo local: usa el fallback a localhost:4001
const backendBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4001/api';

export const axiosInstance = axios.create({
    baseURL: backendBaseUrl
});
