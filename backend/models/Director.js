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

// Middleware para actualizar la fecha en cada guardado (save)
directorSchema.pre('save', function (next) {
    this.fechaActualizacion = new Date();
    next();
});

// Middleware para actualizar la fecha en actualizaciones (update)
directorSchema.pre('findOneAndUpdate', function (next) {
    this.set({ fechaActualizacion: new Date() });
    next();
});

module.exports = model('Director', directorSchema);