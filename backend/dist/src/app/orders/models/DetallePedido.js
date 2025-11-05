"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetallePedido = void 0;
class DetallePedido {
    constructor(id, pedidoId, productoId, cantidad, subtotal) {
        this.id = id;
        this.pedidoId = pedidoId;
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }
}
exports.DetallePedido = DetallePedido;
