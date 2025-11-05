interface FakeClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  cityId: number;
  address: string;
  registeredAt: Date;
}

export class FakeClientsRepository {
  private clients: FakeClient[];

  constructor(clients?: FakeClient[]) {
    this.clients = clients ?? [];
  }

  getById(id: string) {
    return Promise.resolve(this.clients.find((client) => client.id === id));
  }
}
