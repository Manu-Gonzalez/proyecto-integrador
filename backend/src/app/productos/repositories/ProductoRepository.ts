import { prisma } from "../../../config/prismaClient";
import { ProductoCreate, ProductoUpdate } from "../models/ProductoTypes";

export class ProductoRepository {
    async getAll(): Promise<any[]> {
        return prisma.producto.findMany({
            include: {
                categoria: true
            }
        });
    }

    async getById(id: number): Promise<any | null> {
        return prisma.producto.findUnique({
            where: { id },
            include: {
                categoria: true
            }
        });
    }

    async getByCategoria(categoriaId: number): Promise<any[]> {
        return prisma.producto.findMany({
            where: { categoriaId },
            include: {
                categoria: true
            }
        });
    }

    async create(data: ProductoCreate): Promise<any> {
        return prisma.producto.create({
            data,
            include: {
                categoria: true
            }
        });
    }

    async update(id: number, data: ProductoUpdate): Promise<any> {
        return prisma.producto.update({
            where: { id },
            data,
            include: {
                categoria: true
            }
        });
    }

    async delete(id: number): Promise<any> {
        return prisma.producto.delete({
            where: { id }
        });
    }
}