const { Schema, model } = require('mongoose');

const productoraSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre de la productora es obligatorio'],
        unique: true,
        trim: true
    },

    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },

    slogan: {
        type: String,
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
productoraSchema.pre('save', function () {
    this.fechaActualizacion = new Date();
});

// Middleware para actualizar la fecha en actualizaciones (update)
productoraSchema.pre('findOneAndUpdate', function () {
    this.set({ fechaActualizacion: new Date() });
});

module.exports = model('Productora', productoraSchema);