const { Schema, model } = require('mongoose');

const mediaSchema = new Schema({

    serial: {
        type: String,
        required: true,
        unique: true
    },

    titulo: {
        type: String,
        required: true,
        trim: true
    },

    sinopsis: {
        type: String
    },

    url: {
        type: String,
        required: true,
        unique: true
    },

    imagen: {
        type: String
    },

    anioEstreno: {
        type: Number,
        required: true
    },

    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },

    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },

    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },

    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
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
mediaSchema.pre('save', function () {
    this.fechaActualizacion = new Date();
});

// Middleware para actualizar la fecha en actualizaciones (update)
mediaSchema.pre('findOneAndUpdate', function () {
    this.set({ fechaActualizacion: new Date() });
});

module.exports = model('Media', mediaSchema);