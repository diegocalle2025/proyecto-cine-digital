import { axiosInstance } from './axiosConfig';

/**
 * Obtiene la lista completa de géneros
 */
export const getGeneros = () => {
    return axiosInstance.get('/genero');
};

/**
 * Crea un nuevo género
 * @param {Object} data Objeto con nombre, estado, descripcion
 */
export const createGenero = (data) => {
    return axiosInstance.post('/genero', data);
};

/**
 * Actualiza un género existente por ID
 * @param {string} id 
 * @param {Object} data 
 */
export const updateGenero = (id, data) => {
    return axiosInstance.put(`/genero/${id}`, data);
};

/**
 * Elimina un género por ID
 * @param {string} id 
 */
export const deleteGenero = (id) => {
    return axiosInstance.delete(`/genero/${id}`);
};
