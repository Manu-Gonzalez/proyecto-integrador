"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaOrderRepository = void 0;
const prismaClient_1 = require("../../../config/prismaClient");
class PrismaOrderRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.pedido.findMany({
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
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.pedido.findUnique({
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
        });
    }
    create(pedidoData) {
        return __awaiter(this, void 0, void 0, function* () {
            let total = 0;
            // Calcular total
            for (const detalle of pedidoData.detalles) {
                const producto = yield prismaClient_1.prisma.producto.findUnique({
                    where: { id: detalle.productoId }
                });
                if (producto) {
                    total += producto.precio * detalle.cantidad;
                }
            }
            return prismaClient_1.prisma.pedido.create({
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
        });
    }
    updateEstado(id, estado) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.pedido.update({
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
        });
    }
}
exports.PrismaOrderRepository = PrismaOrderRepository;
