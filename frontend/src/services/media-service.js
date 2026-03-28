import { axiosInstance } from './axios-config';

export const getMedias = () => {
    return axiosInstance.get('/media');
};

export const getMediaById = (id) => {
    return axiosInstance.get(`/media/${id}`);
};

export const createMedia = (mediaData) => {
    return axiosInstance.post('/media', mediaData);
};

export const updateMedia = (id, mediaData) => {
    return axiosInstance.put(`/media/${id}`, mediaData);
};

export const deleteMedia = (id) => {
    return axiosInstance.delete(`/media/${id}`);
};
