import { randomUUID } from "crypto";
import { Client } from "../models/Client";
import { ClientCreate } from "../models/ClientCreate";
import { ClientsRepository } from "./ClientsRepository";
import { prisma } from "src/config/prismaClient";
import { AnyAaaaRecord, AnyCaaRecord } from "dns";

export class PrismaClientRepository implements ClientsRepository {
    private clients: Client[];

    constructor(clients?: Client[]) {
        this.clients = clients ?? [];
    }

    async getAll(): Promise<any> {
        return await prisma.client.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                dni: true,
                cityId: true,
                address: true,
                registerAt: true,
            }
        });
    }

    async getById(id: string): Promise<any> {

        return await prisma.client.findUnique({
            where: {
                id,
            }
        });
    }

    create(client: ClientCreate): Promise<any> {
        //Tipado de propiedades 
        //  id: string,
        //  firstName: string,
        //  lastName: string,
        //  email: string,
        //  dni: string,
        //  cityId: number,
        //  address: string,
        //  registeredAt: Date
        //Modelo de prisma
        //   id         String   @id
        //   firstName  String
        //   lastName   String
        //   email      String   @unique
        //   dni        String   @unique
        //   cityId     Int
        //   city       City     @relation(fields: [cityId], references: [city_id])
        //   address    String
        //   registerAt DateTime @default(now())

        return prisma.client.create({
            data: {
                id: String(randomUUID()),
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                dni: client.dni,
                cityId: client.cityId,
                address: client.address,
                registerAt: new Date()
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                dni: true,
                cityId: true,
                address: true,
                registerAt: true,
            }
        });
    }
}
