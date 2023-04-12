const validarCategoria = (req) => {
    const validaciones = [];

    if (!req.body.nombre) {
        validaciones.push('nombre es requerido');
    }

    return validaciones;
}

module.exports = {
    validarCategoria,
}