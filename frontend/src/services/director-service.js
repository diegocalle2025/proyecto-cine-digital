import { axiosInstance } from './axios-config';

export const getDirectores = () => {
    return axiosInstance.get('/director');
};

export const createDirector = (directorData) => {
    return axiosInstance.post('/director', directorData);
};

export const updateDirector = (id, directorData) => {
    return axiosInstance.put(`/director/${id}`, directorData);
};

export const deleteDirector = (id) => {
    return axiosInstance.delete(`/director/${id}`);
};
