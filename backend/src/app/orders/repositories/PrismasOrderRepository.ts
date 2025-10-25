import { Prisma, Pedido, PedidoProducto } from "@prisma/client";
import { prisma } from "../../../config/prismaClient";
import { OrdersRepository } from "./OrderRepository";
import { randomUUID } from "crypto";

type PedidoConProductos = Prisma.PedidoGetPayload<{
    include: { PedidoProducto: true }
}>;

export class PrismaOrderRepository implements OrdersRepository {
    async getAll(): Promise<(Pedido & {
        Client: any;
        PedidoProducto: (PedidoProducto & { Producto: any })[];
    })[]> {
        return prisma.pedido.findMany({
            include: {
                Client: true,
                PedidoProducto: {
                    include: {
                        Producto: true
                    }
                }
            }
        });
    }

    async getById(id: string): Promise<(Pedido & {
        Client: any;
        PedidoProducto: (PedidoProducto & { Producto: any })[];
    }) | null> {
        return prisma.pedido.findUnique({
            where: { id },
            include: {
                Client: true,
                PedidoProducto: {
                    include: {
                        Producto: true
                    }
                }
            }
        });
    }

    async create(
        clientId: string,
        productos: { productoId: string }[]
    ): Promise<PedidoConProductos> {
        return prisma.pedido.create({
            data: {
                clientId,
                PedidoProducto: {
                    create: productos.map(p => ({
                        productoId: p.productoId
                    }))
                }
            },
            include: {
                PedidoProducto: true
            }
        });
    }

    async updatePedido(
        id: string,
        data: {
            status?: boolean;
            total?: number;
            productos?: { productoId: string }[];
        }
    ): Promise<PedidoConProductos> {

        const updateData: Prisma.PedidoUpdateInput = {};

        if (data.status !== undefined) updateData.status = data.status;
        if (data.total !== undefined) updateData.total = data.total;

        if (data.productos) {
            updateData.PedidoProducto = {
                deleteMany: {}, // Borra todos los subpedidos previos
                create: data.productos.map(p => ({
                    productoId: p.productoId
                }))
            };
        }

        return prisma.pedido.update({
            where: { id },
            data: updateData,
            include: {
                PedidoProducto: true
            }
        });
    }

    async deleteSubpedido(pedidoId: string, productoId: string): Promise<{ count: number }> {
        return prisma.pedidoProducto.deleteMany({
            where: {
                pedidoId,
                productoId,
            },
        });
    }

}
