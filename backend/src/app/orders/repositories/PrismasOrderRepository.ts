import { prisma } from "../../../config/prismaClient";
import { OrdersRepository } from "./OrderRepository";
import { PedidoCreate } from "../models/OrderTypes";
import { Pedido, EstadoPedido } from "../models/Order";

export class PrismaOrderRepository implements OrdersRepository {
    async getAll(): Promise<any[]> {
        return prisma.pedido.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        nombre: true,
                        email: true
                    }
                },
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }

    async getById(id: number): Promise<any | null> {
        return prisma.pedido.findUnique({
            where: { id },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nombre: true,
                        email: true
                    }
                },
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }

    async create(pedidoData: PedidoCreate): Promise<any> {
        let total = 0;
        
        // Calcular total
        for (const detalle of pedidoData.detalles) {
            const producto = await prisma.producto.findUnique({
                where: { id: detalle.productoId }
            });
            if (producto) {
                total += producto.precio * detalle.cantidad;
            }
        }

        return prisma.pedido.create({
            data: {
                usuarioId: pedidoData.usuarioId,
                total,
                detalles: {
                    create: pedidoData.detalles.map(detalle => ({
                        productoId: detalle.productoId,
                        cantidad: detalle.cantidad,
                        subtotal: 0 // Se calculará con trigger o en el servicio
                    }))
                }
            },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nombre: true,
                        email: true
                    }
                },
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }

    async updateEstado(id: number, estado: EstadoPedido): Promise<any> {
        return prisma.pedido.update({
            where: { id },
            data: { estado },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nombre: true,
                        email: true
                    }
                },
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }
}
