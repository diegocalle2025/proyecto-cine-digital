require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getConnection } = require('./db/db-connection-mongo');

const app = express();
const port = process.env.PORT || 4000;

// Variables de entorno y rutas:
const path = require('path');
const uploadsPath = path.join(__dirname, 'uploads');

// Configurar confianza en el proxy (Necesario para Render/Vercel)
app.set('trust proxy', 1);

// Configuración de CORS:
// - Permite el dominio dinámico de FRONTEND_URL configurado en producción (Render)
// - Realiza normalización defensiva: elimina "/" final de la URL si el usuario la incluyó
// - Fallback a "*" permite desarrollo local sin restricciones
let allowedOrigin = process.env.FRONTEND_URL || '*';

if (allowedOrigin.endsWith('/') && allowedOrigin !== '*') {
    allowedOrigin = allowedOrigin.slice(0, -1);
}

app.use(cors({
    origin: allowedOrigin
}));
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('Servidor Backend Operativo en puerto ' + port);
});

// Ruta raíz para evitar errores "Cannot GET /"
app.get('/', (req, res) => {
    res.status(200).send('🎬 Bienvenido a la API de Cine Digital. El servidor está configurado correctamente.');
});

// Servir archivos estáticos (Imágenes subidas)
app.use('/uploads', express.static(uploadsPath));

app.use('/api/genero', require('./routes/genero'));
app.use('/api/director', require('./routes/director'));
app.use('/api/productora', require('./routes/productora'));
app.use('/api/tipo', require('./routes/tipo'));
app.use('/api/media', require('./routes/media'));

getConnection();

app.listen(port, () => {
    console.log(`---- 🟢 Servidor backend escuchando en el puerto ${port} ----`);
});


