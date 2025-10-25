import { Client } from "../models/Client";
import { ClientCreate } from "../models/ClientCreate";

export interface ClientsRepository {
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  create(client: ClientCreate): Promise<any>;
}
