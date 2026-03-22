require('dotenv').config();

console.log("MONGO_URI =", process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const { getConnection } = require('./db/db-connection-mongo');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('Servidor Backend Operativo');
});

// Servir archivos estáticos (Imágenes subidas)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/genero', require('./routes/genero'));
app.use('/api/director', require('./routes/director'));
app.use('/api/productora', require('./routes/productora'));
app.use('/api/tipo', require('./routes/tipo'));
app.use('/api/media', require('./routes/media'));

getConnection();

app.listen(port, () => {
    console.log(`---- 🟢 Servidor backend escuchando en el puerto ${port}----`);
});


