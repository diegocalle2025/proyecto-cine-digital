import { axiosInstance } from './axiosConfig';

export const getDirectores = () => {
    return axiosInstance.get('/director');
};

export const createDirector = (data) => {
    return axiosInstance.post('/director', data);
};

export const updateDirector = (id, data) => {
    return axiosInstance.put(`/director/${id}`, data);
};

export const deleteDirector = (id) => {
    return axiosInstance.delete(`/director/${id}`);
};
