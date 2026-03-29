import axios from 'axios';
import Swal from 'sweetalert2';

// URL base del backend:
// - En producción (Vercel): se toma de la variable de entorno REACT_APP_API_URL
// - En desarrollo local: usa el fallback a localhost:4001
const backendBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4001/api';

export const axiosInstance = axios.create({
    baseURL: backendBaseUrl
});

// Interceptor de Solicitud: Logging en desarrollo
axiosInstance.interceptors.request.use(config => {
    // console.log(`🚀 Realizando petición a: ${config.url}`);
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor de Respuesta: Manejo Global de Errores
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const { response } = error;

        if (response) {
            // Manejo de errores específicos según el código de estado
            const status = response.status;
            const message = response.data?.msg || 'Ocurrió un error inesperado en el servidor.';

            if (status >= 500) {
                Swal.fire('Error del Servidor', 'El servicio no está disponible temporalmente. Inténtalo más tarde.', 'error');
            } else if (status === 404) {
                Swal.fire('No Encontrado', 'El recurso solicitado no existe.', 'warning');
            } else if (status === 400) {
                // Para errores 400 (validaciones), a menudo el componente querrá manejarlo, 
                // pero aquí registramos el log o mostramos un aviso genérico si no tiene mensaje.
                console.warn('⚠️ Error de validación:', message);
            }
        } else {
            // Error de red o servidor caído por completo
            Swal.fire('Error de Conexión', 'No se pudo establecer contacto con el backend. Verifica tu conexión.', 'error');
        }

        return Promise.reject(error);
    }
);
