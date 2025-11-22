import { prisma } from "../../../config/prismaClient";
import { MesasRepository } from "./MesaRepository";
import { Mesa } from "../models/Mesa";
import { MesaCreate, MesaUpdate } from "../models/MesaTypes";

export class PrismaMesasRepository implements MesasRepository {
  async findAll(): Promise<Mesa[]> {
    const mesas = await prisma.mesa.findMany();
    return mesas.map(m => new Mesa(m.id, m.numero, m.capacidad, m.estado));
  }

  async findById(id: number): Promise<Mesa | null> {
    const mesa = await prisma.mesa.findUnique({ where: { id } });
    return mesa ? new Mesa(mesa.id, mesa.numero, mesa.capacidad, mesa.estado) : null;
  }

  async findByNumero(numero: number): Promise<Mesa | null> {
    const mesa = await prisma.mesa.findUnique({ where: { numero } });
    return mesa ? new Mesa(mesa.id, mesa.numero, mesa.capacidad, mesa.estado) : null;
  }

  async create(data: MesaCreate): Promise<Mesa> {
    const mesa = await prisma.mesa.create({ data });
    return new Mesa(mesa.id, mesa.numero, mesa.capacidad, mesa.estado);
  }

  async update(id: number, data: MesaUpdate): Promise<Mesa | null> {
    try {
      const mesa = await prisma.mesa.update({ where: { id }, data });
      return new Mesa(mesa.id, mesa.numero, mesa.capacidad, mesa.estado);
    } catch {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.mesa.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}