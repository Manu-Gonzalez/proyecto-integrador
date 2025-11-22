import { Mesa } from "../models/Mesa";
import { MesaCreate, MesaUpdate } from "../models/MesaTypes";

export interface MesasRepository {
  findAll(): Promise<Mesa[]>;
  findById(id: number): Promise<Mesa | null>;
  findByNumero(numero: number): Promise<Mesa | null>;
  create(data: MesaCreate): Promise<Mesa>;
  update(id: number, data: MesaUpdate): Promise<Mesa | null>;
  delete(id: number): Promise<boolean>;
}