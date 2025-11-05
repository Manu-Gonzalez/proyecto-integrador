import { TestOrder } from "tests/orders/TestOrder";
import { TestClient } from "tests/clients/TestClient";

export const toExpectedClientDetailsResponse = (
  client: TestClient,
  orders: TestOrder[]
) => {
  return {
    id: client.id,
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email,
    dni: client.dni,
    city: client.city,
    address: client.address,
    registeredAt: client.registeredAt.toISOString(),
    orders: orders.map((order) => ({
      id: order.id,
      total: order.total,
      itemsCount: order.items.length,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    })),
  };
};
