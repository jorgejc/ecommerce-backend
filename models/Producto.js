const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    inventario: {
        type: Number,
        required: true,
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendedor',
        required: true,
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
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

module.exports = model('Producto', ProductoSchema);