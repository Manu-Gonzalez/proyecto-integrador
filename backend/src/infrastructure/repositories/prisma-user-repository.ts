import { injectable, inject } from 'tsyringe';
import type { UserRepository } from '@domain/repositories/user-repository';
import type { User } from '@domain/entities/user';
import { PrismaClient } from '@prisma/client';

@injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  private toDomain(prismaUser: any): User {
    return {
      id: prismaUser.id.toString(),
      nombre: prismaUser.nombre,
      email: prismaUser.email,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }

  private toPrisma(user: User): any {
    return {
      nombre: user.nombre,
      email: user.email,
    };
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.usuario.findUnique({
      where: { id: parseInt(id) },
    });
    return prismaUser ? this.toDomain(prismaUser) : null;
  }

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.usuario.findMany();
    return prismaUsers.map(this.toDomain);
  }

  async create(entity: User): Promise<User> {
    const prismaUser = await this.prisma.usuario.create({
      data: this.toPrisma(entity),
    });
    return this.toDomain(prismaUser);
  }

  async update(id: string, entity: Partial<User>): Promise<User | null> {
    const data: any = {};
    if (entity.nombre) data.nombre = entity.nombre;
    if (entity.email) data.email = entity.email;
    const prismaUser = await this.prisma.usuario.update({
      where: { id: parseInt(id) },
      data,
    });
    return prismaUser ? this.toDomain(prismaUser) : null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.usuario.delete({
        where: { id: parseInt(id) },
      });
      return true;
    } catch {
      return false;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.usuario.findUnique({
      where: { email },
    });
    return prismaUser ? this.toDomain(prismaUser) : null;
  }
}