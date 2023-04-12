const { Router } = require('express');
const Producto = require('../models/Producto');
const { validarProducto } = require('../helpers/validar-producto');

const router = Router();

router.get('/', async function(req, res){
    try{

        const productos = await Producto.find().populate([
            {
                path: 'vendedor', select: 'nombre email'
            },
            {
                path: 'marca', select: 'nombre'
            },
            {
                path: 'categoria', select: 'nombre'
            }
        ]);
        res.send(productos);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar productos');
    }
         
});

router.post('/', async function(req, res){
    try{
        const validaciones = validarProducto(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let producto = new Producto();
        producto.nombre = req.body.nombre;
        producto.descripcion = req.body.descripcion;
        producto.precio = req.body.precio;
        producto.foto = req.body.foto;
        producto.inventario = req.body.inventario;
        producto.vendedor = req.body.vendedor._id;
        producto.marca = req.body.marca._id;
        producto.categoria = req.body.categoria._id;
        producto.fechaCreacion = new Date();
        producto.fechaActualizacion = new Date();

        producto = await producto.save();
        res.send(producto);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al ingresar producto');
    }
});

router.put('/', function(req, res){
    res.send('Estoy en put iventario');       
});

router.put('/:productoId', async function(req, res){
    try{

        const validaciones = validarProducto(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let producto = await Producto.findById(req.params.productoId);
        if(!producto) {
            return res.status(400).send('No existe el producto');
        }
        
        producto.nombre = req.body.nombre;
        producto.descripcion = req.body.descripcion;
        producto.precio = req.body.precio;
        producto.foto = req.body.foto;
        producto.vendedor = req.body.vendedor._id;
        producto.marca = req.body.marca._id;
        producto.categoria = req.body.categoria._id;
        producto.fechaCreacion = new Date();
        producto.fechaActualizacion = new Date();

        producto = await producto.save();
        res.send(producto);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar producto');
    }
});

module.exports = router; // como es un modulo, lo exportamos