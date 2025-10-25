interface FakeOrder {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  items: {
    id: string;
    productId: string;
    quantity: number;
  }[];
}

export class FakeOrderRepository {
  private orders: FakeOrder[];

  constructor(orders?: FakeOrder[]) {
    this.orders = orders ?? [];
  }

  getById(id: string) {
    return Promise.resolve(this.orders.find((order) => order.id === id));
  }
}
