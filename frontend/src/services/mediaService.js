import { axiosInstance } from './axiosConfig';

export const getMedias = () => {
    return axiosInstance.get('/media');
};

export const getMediaById = (id) => {
    return axiosInstance.get(`/media/${id}`);
};

export const createMedia = (data) => {
    return axiosInstance.post('/media', data);
};

export const updateMedia = (id, data) => {
    return axiosInstance.put(`/media/${id}`, data);
};

export const deleteMedia = (id) => {
    return axiosInstance.delete(`/media/${id}`);
};
