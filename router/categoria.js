const { Router } = require('express');
const Categoria = require('../models/Categoria');
const { validarCategoria } = require('../helpers/validar-categoria');

const router = Router();

router.get('/', async function(req, res){
    try{
        const categorias = await Categoria.find();
            res.send(categorias);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', async function(req, res){
     try{
        const validaciones = validarCategoria(req);
        
        if (validaciones.length > 0) { //validaciones.length > 0)
            return res.status(400).send(validaciones);
        }
        
        let categoria = new Categoria();
        categoria.nombre = req.body.nombre;
        categoria.fechaCreacion = new Date();
        categoria.fechaActualizacion = new Date();

        categoria = await categoria.save();
        res.send(categoria);

    } catch(error) {
        console.log('error');
        res.status(500).send('Ocurrió un error');
    }    
});

router.put('/:categoriaId', async function(req, res){
    try{
        const validaciones = validarCategoria(req);
        
        if (validaciones.length > 0) { //validaciones.length > 0)
            return res.status(400).send(validaciones);
        }

        let categoria = await Categoria.findById(req.params.categoriaId);
        if(!categoria) {
            return res.status(400).send('Categoria no existe');
        }
        categoria.nombre = req.body.nombre;
        categoria.fechaActualizacion = new Date();
        categoria = await categoria.save();
        res.send(categoria);
    } catch(error) {
        console.log('error');
        res.status(500).send('Ocurrió un error');
    }    
});

module.exports = router; // como es un modulo, lo exportamos