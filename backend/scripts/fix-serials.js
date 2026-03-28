/**
 * Script de corrección única de seriales en MongoDB.
 * Propósito: Normalizar el serial 'CUEV-003' al formato estándar 'M003'.
 * Ejecución: node scripts/fix-serials.js (desde la carpeta /backend)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Media = require('../models/Media');

const fixSerials = async () => {
    console.log('🔧 Conectando a MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado.');

    const updatedRecord = await Media.findOneAndUpdate(
        { serial: 'CUEV-003' },
        { serial: 'M003' },
        { new: true }
    );

    if (updatedRecord) {
        console.log(`✅ Serial actualizado correctamente: CUEV-003 → M003`);
        console.log(`   Título: ${updatedRecord.titulo}`);
    } else {
        console.log('ℹ️  No se encontró ningún documento con serial CUEV-003. Puede que ya esté corregido.');
    }

    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB. Script finalizado.');
};

fixSerials().catch((error) => {
    console.error('❌ Error en el script:', error);
    process.exit(1);
});
