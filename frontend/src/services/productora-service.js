import { axiosInstance } from './axios-config';

export const getProductoras = () => {
    return axiosInstance.get('/productora');
};

export const createProductora = (productoraData) => {
    return axiosInstance.post('/productora', productoraData);
};

export const updateProductora = (id, productoraData) => {
    return axiosInstance.put(`/productora/${id}`, productoraData);
};

export const deleteProductora = (id) => {
    return axiosInstance.delete(`/productora/${id}`);
};
