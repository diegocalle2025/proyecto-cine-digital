import { axiosInstance } from './axios-config';

/**
 * Obtiene la lista completa de géneros
 */
export const getGeneros = () => {
    return axiosInstance.get('/genero');
};

/**
 * Crea un nuevo género
 * @param {Object} generoData Objeto con nombre, estado, descripcion
 */
export const createGenero = (generoData) => {
    return axiosInstance.post('/genero', generoData);
};

/**
 * Actualiza un género existente por ID
 * @param {string} id 
 * @param {Object} generoData 
 */
export const updateGenero = (id, generoData) => {
    return axiosInstance.put(`/genero/${id}`, generoData);
};

/**
 * Elimina un género por ID
 * @param {string} id 
 */
export const deleteGenero = (id) => {
    return axiosInstance.delete(`/genero/${id}`);
};
