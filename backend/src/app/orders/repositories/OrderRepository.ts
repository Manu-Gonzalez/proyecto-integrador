import { Producto, Pedido } from "@prisma/client";
import Order from "../models/Order";
import { OrderCreate } from "../models/OrderCreate";

export interface OrdersRepository {
    getAll(): Promise<Pedido[]>;
    getById(id: string): Promise<Pedido | null>;
    create(clientId: string, productos: { productoId: string; cantidad: number }[]): Promise<Pedido>;
}
