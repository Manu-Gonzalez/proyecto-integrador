import { randomUUID } from "crypto";
import { TestOrder } from "tests/orders/TestOrder";

export class OrderBuilder {
  private order: TestOrder;

  constructor() {
    this.order = {
      id: randomUUID(),
      total: 1000,
      status: "pending",
      createdAt: new Date(),
      items: [],
    };
  }

  addItem(item?: { quantity?: number }) {
    this.order.items.push({
      id: randomUUID(),
      productId: randomUUID(),
      quantity: item?.quantity ?? 1,
    });
    return this;
  }

  setStatus(status: string) {
    this.order.status = status;
    return this;
  }

  build() {
    return this.order;
  }
}
