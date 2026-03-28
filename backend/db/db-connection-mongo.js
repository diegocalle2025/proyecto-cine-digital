const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI;
        if (!url) {
            throw new Error('La variable MONGO_URI no está definida en el archivo .env');
        }

        mongoose.set('strictQuery', false); // Para compatibilidad con versiones futuras

        await mongoose.connect(url, {
            // Opciones de robustez recomendadas para Atlas
            serverSelectionTimeoutMS: 5000, 
            heartbeatFrequencyMS: 10000,
        });

        console.log('✅ Conexión exitosa a MongoDB Atlas');

    } catch (error) {
        console.error('❌ Error crítico al conectar a MongoDB:', error.message);
    }
}

module.exports = {
    getConnection,
}
