import { injectable, inject } from 'tsyringe';
import type { UserRepository } from '@domain/repositories/user-repository';
import type { User } from '@domain/entities/user';

export interface CreateUserRequest {
  nombre: string;
  email: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository
  ) {}

  async execute(request: CreateUserRequest): Promise<User> {
    // Lógica de negocio
    const user: User = {
      id: '', // Se generará en la base de datos
      nombre: request.nombre,
      email: request.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.userRepository.create(user);
  }
}