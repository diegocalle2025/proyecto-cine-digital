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

// Middleware para actualizar la fecha en cada guardado (save)
tipoSchema.pre('save', function (next) {
    this.fechaActualizacion = new Date();
    next();
});

// Middleware para actualizar la fecha en actualizaciones (update)
tipoSchema.pre('findOneAndUpdate', function (next) {
    this.set({ fechaActualizacion: new Date() });
    next();
});

module.exports = model('Tipo', tipoSchema);