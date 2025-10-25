import { container } from "@diContainer/container";
import { FakeClientsRepository } from "tests/clients/FakeClientsRepository";
import { FakeOrderRepository } from "tests/orders/FakeOrdersRepository";
import { ClientBuilder } from "tests/clients/ClientBuilder";
import { OrderBuilder } from "tests/orders/OrderBuilder";

export const setupClientWithOrders = () => {
  const client = new ClientBuilder().build();
  const clientsRepository = new FakeClientsRepository([client]);

  const orders = [
    new OrderBuilder().setStatus("canceled").addItem({ quantity: 3 }).build(),
    new OrderBuilder()
      .addItem({ quantity: 1 })
      .addItem({ quantity: 2 })
      .build(),
  ];
  const ordersRepository = new FakeOrderRepository(orders);

  container.registerInstance("clients-repository", clientsRepository);
  container.registerInstance("orders-repository", ordersRepository);

  return { client, orders };
};
