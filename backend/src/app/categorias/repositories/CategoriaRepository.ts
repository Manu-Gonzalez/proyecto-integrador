import { prisma } from "../../../config/prismaClient";
import { CategoriaCreate } from "../models/CategoriaTypes";

export class CategoriaRepository {
    async getAll(): Promise<any[]> {
        return prisma.categoria.findMany({
            include: {
                productos: true
            }
        });
    }

    async getById(id: number): Promise<any | null> {
        return prisma.categoria.findUnique({
            where: { id },
            include: {
                productos: true
            }
        });
    }

    async create(data: CategoriaCreate): Promise<any> {
        return prisma.categoria.create({
            data,
            include: {
                productos: true
            }
        });
    }

    async update(id: number, data: CategoriaCreate): Promise<any> {
        return prisma.categoria.update({
            where: { id },
            data,
            include: {
                productos: true
            }
        });
    }

    async delete(id: number): Promise<any> {
        return prisma.categoria.delete({
            where: { id }
        });
    }
}