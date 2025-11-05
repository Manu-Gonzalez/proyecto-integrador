import { EstadoPedido } from "./Order";

export type PedidoCreate = {
  usuarioId: number;
  detalles: {
    productoId: number;
    cantidad: number;
  }[];
};

export type DetallePedidoCreate = {
  productoId: number;
  cantidad: number;
  subtotal: number;
};