const { Schema, model } = require('mongoose');

const MarcaSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        required: true,
    },
    fechaActualizacion: {
        type: Date,
        required: true,
    }
});

module.exports = model('Marca', MarcaSchema);