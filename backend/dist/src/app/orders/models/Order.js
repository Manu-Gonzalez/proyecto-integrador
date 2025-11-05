"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = exports.EstadoPedido = void 0;
var EstadoPedido;
(function (EstadoPedido) {
    EstadoPedido["PENDIENTE"] = "pendiente";
    EstadoPedido["CONFIRMADO"] = "confirmado";
    EstadoPedido["ENTREGADO"] = "entregado";
    EstadoPedido["CANCELADO"] = "cancelado";
})(EstadoPedido || (exports.EstadoPedido = EstadoPedido = {}));
class Pedido {
    constructor(id, fecha, estado, total, usuarioId) {
        this.id = id;
        this.fecha = fecha;
        this.estado = estado;
        this.total = total;
        this.usuarioId = usuarioId;
    }
    isPendiente() {
        return this.estado === EstadoPedido.PENDIENTE;
    }
    isEntregado() {
        return this.estado === EstadoPedido.ENTREGADO;
    }
}
exports.Pedido = Pedido;
