import { axiosInstance } from './axiosConfig';

export const getTipos = () => {
    return axiosInstance.get('/tipo');
};

export const createTipo = (data) => {
    return axiosInstance.post('/tipo', data);
};

export const updateTipo = (id, data) => {
    return axiosInstance.put(`/tipo/${id}`, data);
};

export const deleteTipo = (id) => {
    return axiosInstance.delete(`/tipo/${id}`);
};
