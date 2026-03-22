const { Schema, model } = require('mongoose');

const directorSchema = new Schema({

    nombres: {
        type: String,
        required: [true, 'El nombre del director es obligatorio'],
        trim: true
    },

    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
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

module.exports = model('Director', directorSchema);