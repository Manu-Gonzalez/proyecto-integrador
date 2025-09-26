import type { UserRepository } from '@domain/repositories/user-repository';
import type { User } from '@domain/entities/user';
import { PrismaClient } from '@prisma/client';
export declare class PrismaUserRepository implements UserRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    private toDomain;
    private toPrisma;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(entity: User): Promise<User>;
    update(id: string, entity: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    findByEmail(email: string): Promise<User | null>;
}
//# sourceMappingURL=prisma-user-repository.d.ts.map