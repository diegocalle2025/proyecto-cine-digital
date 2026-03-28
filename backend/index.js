require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { getConnection } = require('./db/db-connection-mongo');

const app = express();
const port = process.env.PORT || 4000;

// Verificar que la carpeta uploads exista para Multer
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
    console.log('📁 Carpeta /uploads creada automáticamente');
}

// Configuración de CORS:
// - En producción (Render): permite solo el dominio del frontend de Vercel
// - En desarrollo local: permite todos los orígenes
const allowedOrigin = process.env.FRONTEND_URL || '*';
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


