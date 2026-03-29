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
tipoSchema.pre('save', function () {
    this.fechaActualizacion = new Date();
});

// Middleware para actualizar la fecha en actualizaciones (update)
tipoSchema.pre('findOneAndUpdate', function () {
    this.set({ fechaActualizacion: new Date() });
});

module.exports = model('Tipo', tipoSchema);