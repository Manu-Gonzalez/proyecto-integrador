import { MesasRepository } from "./repositories/MesaRepository";
import { MesaCreate, MesaUpdate } from "./models/MesaTypes";
import { Mesa } from "./models/Mesa";

export class MesaService {
  constructor(private readonly mesasRepository: MesasRepository) {}

  async getAllMesas(): Promise<Mesa[]> {
    return await this.mesasRepository.findAll();
  }

  async getMesaById(id: number): Promise<Mesa | null> {
    return await this.mesasRepository.findById(id);
  }

  async createMesa(data: MesaCreate): Promise<Mesa> {
    // Verificar que el número de mesa no exista
    const existing = await this.mesasRepository.findByNumero(data.numero);
    if (existing) {
      throw new Error("Ya existe una mesa con ese número");
    }
    return await this.mesasRepository.create(data);
  }

  async updateMesa(id: number, data: MesaUpdate): Promise<Mesa | null> {
    // Si se actualiza el número, verificar que no exista
    if (data.numero) {
      const existing = await this.mesasRepository.findByNumero(data.numero);
      if (existing && existing.id !== id) {
        throw new Error("Ya existe una mesa con ese número");
      }
    }
    return await this.mesasRepository.update(id, data);
  }

  async deleteMesa(id: number): Promise<boolean> {
    return await this.mesasRepository.delete(id);
  }
}