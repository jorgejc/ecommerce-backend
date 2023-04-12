const validarVendedor = (req) => {
    const validaciones = [];

    if (!req.body.nombre) {
        validaciones.push('nombre es requerido');
    }

    if (!req.body.email) {
        validaciones.push('email es requerido');
    }

    return validaciones;
}

module.exports = {
    validarVendedor,
}