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

export type OrderFilters = {
  estado?: string;
  usuarioId?: number;
  fechaDesde?: string;
  fechaHasta?: string;
  totalMin?: number;
  totalMax?: number;
  pagina?: number;
  limite?: number;
  ordenarPor?: 'fecha' | 'total' | 'estado';
  orden?: 'asc' | 'desc';
};