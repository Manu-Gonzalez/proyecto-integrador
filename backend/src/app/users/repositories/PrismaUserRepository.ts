import { randomUUID } from "crypto";
import { User } from "../models/User";
import { UserCreate, UserWithoutPassword } from "../models/UserTypes";
import { UsersRepository } from "./UserRepository";
import { prisma } from "src/config/prismaClient";
import bcrypt from 'bcryptjs';

export class PrismaUserRepository implements UsersRepository {
    private clients: User[];

    constructor(clients?: User[]) {
        this.clients = clients ?? [];
    }

    async getAll(): Promise<UserWithoutPassword[]> {
        return await prisma.user.findMany({
            select: {
                id: true,
                profileImage: true,
                username: true,
                createdAt: true
            }
        });
    }

    async getById(id: string): Promise<UserWithoutPassword | undefined> {

        return await prisma.user.findUnique({
            where: {
                id,
            },
             select: {
                id: true,
                profileImage: true,
                username: true,
                createdAt: true,
            }
        }) ?? undefined;
    }


    async login(user: { username: string; password: string }): Promise<User | undefined> {
    const userFound = await prisma.user.findUnique({
        where: { username: user.username },
        select: {
        id: true,
        profileImage: true,
        username: true,
        createdAt: true,
        password: true  
        }
    });

    if (!userFound) {
        return undefined; 
    }

    const isValid = await bcrypt.compare(user.password, userFound.password);

    if (!isValid) {
        return undefined; 
    }

    const { password, ...userWithoutPassword } = userFound;

    return userWithoutPassword as User;
    }

    
    async create(user: UserCreate): Promise<UserWithoutPassword> {

        return prisma.user.create({
            data: {

                id: String(randomUUID()),
                profileImage: user.profileImage || "",
                username: user.username,
                password: user.password,
                createdAt: new Date(),

            },
            select: {
                id: true,
                profileImage: true,
                username: true,
                createdAt: true,
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
