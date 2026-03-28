import axios from 'axios';

// Instancia base de Axios con la URL base del Backend Node.js
// Puerto estandarizado: 4001
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4001/api'
});
