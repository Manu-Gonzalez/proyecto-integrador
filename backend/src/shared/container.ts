import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '@infrastructure/repositories/prisma-user-repository';
import { CreateUserUseCase } from '@application/use-cases/create-user-use-case';
import { UserController } from '@presentation/controllers/user-controller';

// Registra PrismaClient
container.register('PrismaClient', { useValue: new PrismaClient() });

// Registra repositories
container.register('UserRepository', { useClass: PrismaUserRepository });

// Registra use cases
container.register('CreateUserUseCase', { useClass: CreateUserUseCase });

// Registra controllers
container.register('UserController', { useClass: UserController });

export { container };