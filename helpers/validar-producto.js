const validarProducto = (req) => {
    const validaciones = [];

    if (!req.body.nombre) {
        validaciones.push('Nombre es requerido');
    }

    if (!req.body.descripcion) {
        validaciones.push('Descripcion es requerido');
    }

    if (!req.body.precio) {
        validaciones.push('Precio es requerido');
    }
    
    if (!req.body.foto) {
        validaciones.push('Foto es requerido');
    }

    if (!req.body.inventario) {
        validaciones.push('inventario es requerido');
    }

    if (!req.body.precio) {
        validaciones.push('Precio es requerido');
    }

    if (!req.body.vendedor) {
        validaciones.push('Vendedor es requerido');
    }

    if (!req.body.marca) {
        validaciones.push('Marca es requerido');
    }

    if (!req.body.categoria) {
        validaciones.push('Categoria es requerido');
    }

    return validaciones;
}

module.exports = {
    validarProducto,
}