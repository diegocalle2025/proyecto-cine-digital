const { Schema, model } = require('mongoose');
const generoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        trim: true,
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: "Activo",
    }, 
    descripcion: {
        type: String,
        trim: true,
    },
 
fechaCreacion: {
    type: Date,
    required: true,
    default: Date.now,
},
fechaActualizacion: {
    type: Date,
    required: true,
    default: Date.now,  
}
});

// Middleware para actualizar la fecha en cada guardado (save)
generoSchema.pre('save', function () {
    this.fechaActualizacion = new Date();
});

// Middleware para actualizar la fecha en actualizaciones (update)
generoSchema.pre('findOneAndUpdate', function () {
    this.set({ fechaActualizacion: new Date() });
});

module.exports = model('Genero', generoSchema);