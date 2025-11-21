import { OrdersRepository } from "./repositories/OrderRepository";
import { PedidoCreate, OrderFilters } from "./models/OrderTypes";
import { EstadoPedido } from "./models/Order";

export class OrderService {
    constructor(private readonly orderRepository: OrdersRepository) {}

    async getAll(filters?: OrderFilters) {
        return await this.orderRepository.getAll(filters);
    }

    async getById(id: number) {
        return await this.orderRepository.getById(id);
    }

    async create(data: PedidoCreate) {
        return await this.orderRepository.create(data);
    }

    async updateEstado(id: number, estado: EstadoPedido) {
        return await this.orderRepository.updateEstado(id, estado);
    }
}