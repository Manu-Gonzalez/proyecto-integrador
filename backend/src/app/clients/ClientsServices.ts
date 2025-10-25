import { Client } from "./models/Client";
import { ClientsRepository } from "./repositories/ClientsRepository";
import { ClientCreate } from "./models/ClientCreate";
export default class ClientsServices {
  constructor(private readonly clientsRepository: ClientsRepository) { }

  async getAll(): Promise<Client[]> {
    return await this.clientsRepository?.getAll();
  }
  async getById(id: string): Promise<Client[]> {
    return await this.clientsRepository?.getById(id);
  }

  async create(client: ClientCreate): Promise<Client[]> {
    return await this.clientsRepository?.create(client);
  }

}
