import { PedidoCreate } from "../models/OrderTypes";
import { EstadoPedido } from "../models/Order";

export interface OrdersRepository {
    getAll(): Promise<any[]>;
    getById(id: number): Promise<any | null>;
    create(pedidoData: PedidoCreate): Promise<any>;
    updateEstado(id: number, estado: EstadoPedido): Promise<any>;
}
