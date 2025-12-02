"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor(id, nombre, precio, imagen, categoriaId) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.categoriaId = categoriaId;
    }
    calcularSubtotal(cantidad) {
        return this.precio * cantidad;
    }
    tieneImagen() {
        return this.imagen !== null && this.imagen.length > 0;
    }
}
exports.Producto = Producto;
