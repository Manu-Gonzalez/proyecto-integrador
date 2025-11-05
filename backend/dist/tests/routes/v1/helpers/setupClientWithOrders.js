"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupClientWithOrders = void 0;
const container_1 = require("@diContainer/container");
const FakeClientsRepository_1 = require("tests/clients/FakeClientsRepository");
const FakeOrdersRepository_1 = require("tests/orders/FakeOrdersRepository");
const ClientBuilder_1 = require("tests/clients/ClientBuilder");
const OrderBuilder_1 = require("tests/orders/OrderBuilder");
const setupClientWithOrders = () => {
    const client = new ClientBuilder_1.ClientBuilder().build();
    const clientsRepository = new FakeClientsRepository_1.FakeClientsRepository([client]);
    const orders = [
        new OrderBuilder_1.OrderBuilder().setStatus("canceled").addItem({ quantity: 3 }).build(),
        new OrderBuilder_1.OrderBuilder()
            .addItem({ quantity: 1 })
            .addItem({ quantity: 2 })
            .build(),
    ];
    const ordersRepository = new FakeOrdersRepository_1.FakeOrderRepository(orders);
    container_1.container.registerInstance("clients-repository", clientsRepository);
    container_1.container.registerInstance("orders-repository", ordersRepository);
    return { client, orders };
};
exports.setupClientWithOrders = setupClientWithOrders;
