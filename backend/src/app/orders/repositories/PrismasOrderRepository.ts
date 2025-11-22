import { prisma } from "../../../config/prismaClient";
import { OrdersRepository } from "./OrderRepository";
import { PedidoCreate, OrderFilters } from "../models/OrderTypes";
import { Pedido, EstadoPedido } from "../models/Order";

export class PrismaOrderRepository implements OrdersRepository {
    async getAll(filters?: OrderFilters): Promise<any[]> {
        const where: any = {};

        if (filters?.estado) {
            where.estado = filters.estado;
        }

        if (filters?.usuarioId) {
            where.usuarioId = filters.usuarioId;
        }

        if (filters?.fechaDesde || filters?.fechaHasta) {
            where.fecha = {};
            if (filters.fechaDesde) {
                where.fecha.gte = new Date(filters.fechaDesde);
            }
            if (filters.fechaHasta) {
                where.fecha.lte = new Date(filters.fechaHasta);
            }
        }

        if (filters?.totalMin !== undefined || filters?.totalMax !== undefined) {
            where.total = {};
            if (filters.totalMin !== undefined) {
                where.total.gte = filters.totalMin;
            }
            if (filters.totalMax !== undefined) {
                where.total.lte = filters.totalMax;
            }
        }

        const orderBy: any = {};
        if (filters?.ordenarPor) {
            orderBy[filters.ordenarPor] = filters.orden === 'desc' ? 'desc' : 'asc';
        } else {
            orderBy.fecha = 'desc'; // por defecto ordenar por fecha descendente
        }

        const skip = filters?.pagina && filters?.limite ? (filters.pagina - 1) * filters.limite : undefined;
        const take = filters?.limite;

        return prisma.pedido.findMany({
            where,
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
            },
            orderBy,
            skip,
            take
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
                mesaId: pedidoData.mesaId,
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
