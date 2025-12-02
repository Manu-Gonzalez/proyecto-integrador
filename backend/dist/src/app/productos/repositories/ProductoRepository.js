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
exports.ProductoRepository = void 0;
const prismaClient_1 = require("../../../config/prismaClient");
class ProductoRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.producto.findMany({
                include: {
                    categoria: true
                }
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.producto.findUnique({
                where: { id },
                include: {
                    categoria: true
                }
            });
        });
    }
    getByCategoria(categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.producto.findMany({
                where: { categoriaId },
                include: {
                    categoria: true
                }
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.producto.create({
                data,
                include: {
                    categoria: true
                }
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.producto.update({
                where: { id },
                data,
                include: {
                    categoria: true
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.producto.delete({
                where: { id }
            });
        });
    }
}
exports.ProductoRepository = ProductoRepository;
