import { randomUUID } from "crypto";
import { Client } from "../models/Client";
import { ClientCreate } from "../models/ClientCreate";
import { ClientsRepository } from "./ClientsRepository";

export class InMemoryClientsRepository implements ClientsRepository {
  private clients: Client[];

  constructor(clients?: Client[]) {
    this.clients = clients ?? [];
  }

  getAll(): Promise<Client[]> {
    return Promise.resolve(this.clients);
  }

  getById(id: string): Promise<Client | undefined> {
    return Promise.resolve(this.clients.find((client) => client.id === id));
  }

  create(client: ClientCreate): Promise<Client> {
    const newClient = new Client(
      randomUUID(),
      client.firstName,
      client.lastName,
      client.email,
      client.dni,
      client.cityId,
      client.address,
      new Date()
    );
    this.clients.push(newClient);
    return Promise.resolve(newClient);
  }
}
