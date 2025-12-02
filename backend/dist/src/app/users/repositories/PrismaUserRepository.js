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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const client_1 = require("@prisma/client");
const User_1 = require("../models/User");
const prismaClient_1 = require("src/config/prismaClient");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class PrismaUserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.prisma.usuario.findMany({
                select: {
                    id: true,
                    nombre: true,
                    email: true,
                    rol: true
                }
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = yield prismaClient_1.prisma.usuario.findUnique({
                where: { id },
                select: {
                    id: true,
                    nombre: true,
                    email: true,
                    rol: true
                }
            })) !== null && _a !== void 0 ? _a : undefined;
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield prismaClient_1.prisma.usuario.findUnique({
                where: { email: credentials.email },
                select: {
                    id: true,
                    nombre: true,
                    email: true,
                    password: true,
                    rol: true
                }
            });
            if (!userFound)
                return undefined;
            const isValid = yield bcryptjs_1.default.compare(credentials.password, userFound.password);
            if (!isValid)
                return undefined;
            return new User_1.User(userFound.id, userFound.nombre, userFound.email, userFound.password, userFound.rol);
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, 10);
            return prismaClient_1.prisma.usuario.create({
                data: {
                    nombre: user.nombre,
                    email: user.email,
                    password: hashedPassword,
                    rol: user.rol || client_1.UserRole.cliente
                },
                select: {
                    id: true,
                    nombre: true,
                    email: true,
                    rol: true
                }
            });
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
// import { randomUUID } from "crypto";
// import { UserCreate, UserWithoutPassword } from "../models/UserTypes";
// import { UsersRepository } from "./UserRepository";
// import { prisma } from "src/config/prismaClient";
// export class PrismaUserRepository implements UsersRepository {
//     async getAll(): Promise<UserWithoutPassword[]> {
//         return prisma.user.findMany({
//             select: {
//                 id: true,
//                 username: true,
//                 createdAt: true,
//             }
//         });
//     }
//     async getById(id: string): Promise<UserWithoutPassword | null> {
//         return prisma.user.findUnique({
//             where: { id },
//             select: {
//                 id: true,
//                 username: true,
//                 createdAt: true,
//             }
//         });
//     }
//     async create(user: UserCreate): Promise<UserWithoutPassword> {
//         return prisma.user.create({
//             data: {
//                 id: randomUUID(),
//                 username: user.username,
//                 password: user.password,
//                 createdAt: new Date(),
//             },
//             select: {
//                 id: true,
//                 username: true,
//                 createdAt: true,
//             }
//         });
//     }
// }
