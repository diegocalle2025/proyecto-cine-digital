const { Schema, model } = require('mongoose');

const tipoSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        trim: true
    },

    descripcion: {
        type: String,
        trim: true
    },

    fechaCreacion: {
        type: Date,
        default: Date.now
    },

    fechaActualizacion: {
        type: Date,
        default: Date.now
    }

});

module.exports = model('Tipo', tipoSchema);