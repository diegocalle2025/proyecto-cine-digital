import { axiosInstance } from './axiosConfig';

export const getProductoras = () => {
    return axiosInstance.get('/productora');
};

export const createProductora = (data) => {
    return axiosInstance.post('/productora', data);
};

export const updateProductora = (id, data) => {
    return axiosInstance.put(`/productora/${id}`, data);
};

export const deleteProductora = (id) => {
    return axiosInstance.delete(`/productora/${id}`);
};
