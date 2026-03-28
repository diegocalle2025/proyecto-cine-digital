import { axiosInstance } from './axios-config';

export const getTipos = () => {
    return axiosInstance.get('/tipo');
};

export const createTipo = (tipoData) => {
    return axiosInstance.post('/tipo', tipoData);
};

export const updateTipo = (id, tipoData) => {
    return axiosInstance.put(`/tipo/${id}`, tipoData);
};

export const deleteTipo = (id) => {
    return axiosInstance.delete(`/tipo/${id}`);
};
