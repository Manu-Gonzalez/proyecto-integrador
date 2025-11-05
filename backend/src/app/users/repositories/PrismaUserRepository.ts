import { UserRole } from "@prisma/client";
import { User } from "../models/User";
import { UserCreate, UserWithoutPassword } from "../models/UserTypes";
import { UsersRepository } from "./UserRepository";
import { prisma } from "src/config/prismaClient";
import bcrypt from 'bcryptjs';

export class PrismaUserRepository implements UsersRepository {
    async getAll(): Promise<UserWithoutPassword[]> {
        return await prisma.usuario.findMany({
            select: {
                id: true,
                nombre: true,
                email: true,
                rol: true
            }
        });
    }

    async getById(id: number): Promise<UserWithoutPassword | undefined> {
        return await prisma.usuario.findUnique({
            where: { id },
            select: {
                id: true,
                nombre: true,
                email: true,
                rol: true
            }
        }) ?? undefined;
    }

    async login(credentials: { email: string; password: string }): Promise<User | undefined> {
        const userFound = await prisma.usuario.findUnique({
            where: { email: credentials.email },
            select: {
                id: true,
                nombre: true,
                email: true,
                password: true,
                rol: true
            }
        });

        if (!userFound) return undefined;

        const isValid = await bcrypt.compare(credentials.password, userFound.password);
        if (!isValid) return undefined;

        return new User(
            userFound.id,
            userFound.nombre,
            userFound.email,
            userFound.password,
            userFound.rol
        );
    }

    async create(user: UserCreate): Promise<UserWithoutPassword> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        return prisma.usuario.create({
            data: {
                nombre: user.nombre,
                email: user.email,
                password: hashedPassword,
                rol: user.rol || UserRole.cliente
            },
            select: {
                id: true,
                nombre: true,
                email: true,
                rol: true
            }
        });
    }
}

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
