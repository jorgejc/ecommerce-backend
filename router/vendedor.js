const { Router } = require('express');
const Vendedor = require('../models/Vendedor');
//const { validationResult  } = require('express-validator');
const { validarVendedor } = require('../helpers/validar-vendedor');
//const { validarUsuario } = require('../validators/validar-usuario');

const router = Router();
//async va despues
router.post('/', async function(req, res){ //recibe dos parametros, request, vienen todos los datos que se le envían al recurso 
    try{
        const validaciones = validarVendedor(req);
        
        if (validaciones.length > 0) { //validaciones.length > 0)
            return res.status(400).send(validaciones);
        } 

        //res.send(req.body);     //y response para responder a la solicitud que viene en request
        const existeVendedor = await Vendedor.findOne({ email: req.body.email });
        if(existeVendedor) {
            return res.status(400).send('Email ya existe');
        }
        
        let vendedor = new Vendedor();
        vendedor.nombre = req.body.nombre;
        vendedor.email = req.body.email;
        vendedor.fechaCreacion = new Date();
        vendedor.fechaActualizacion = new Date();

        vendedor = await vendedor.save();

        res.send(vendedor);

    }catch(error){
        console.log(error);
        res.status(500).send('ocurrio un error al crear vendedor');
    }
});

router.get('/', async function(req, res){ 
    try{
        const vendedores = await Vendedor.find();
        res.send(vendedores);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:vendedorId', async function(req, res){ 
    try{
        const validaciones = validarVendedor(req);
        
        if (validaciones.length > 0) { //validaciones.length > 0)
            return res.status(400).send(validaciones);
        }
        
        console.log('objeto recibido', req.body, req.params);

        let vendedor = await Vendedor.findById(req.params.vendedorId);
        
        if (!vendedor) {
            return res.status(400).send('Vendedor no existe');
        }
    
        const existeVendedor = await Vendedor
        .findOne({ email: req.body.email, _id: { $ne: vendedor._id } });
        if(existeVendedor) {
            return res.status(400).send('Email ya existe');
        }

        vendedor.nombre = req.body.nombre;
        vendedor.email = req.body.email;
        vendedor.fechaCreacion = new Date();
        vendedor.fechaActualizacion = new Date();

        vendedor = await vendedor.save();

        res.send(vendedor);

    }catch(error){
        console.log(error);
        res.status(500).send('ocurrio un error al actualizar usuario');
    }
});

module.exports = router; // como es un modulo, lo exportamos