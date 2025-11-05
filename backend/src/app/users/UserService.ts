import { User } from "./models/User";
import { UsersRepository } from "./repositories/UserRepository";
import { UserCreate, UserWithoutPassword } from "./models/UserTypes";
import * as tokenFunctions from "../../shared/utils/token"
import { prisma } from "src/config/prismaClient";

export default class UserServices {
  constructor(private readonly userRepository: UsersRepository) { }

  async getAll(): Promise<UserWithoutPassword[]> {
    return await this.userRepository?.getAll();
  }

  async getById(id: number): Promise<UserWithoutPassword | undefined> {
    return await this.userRepository?.getById(id);
  }

  async create(user: UserCreate): Promise<UserWithoutPassword> {
    return await this.userRepository?.create(user);
  }

  async login(credentials: { email: string; password: string }): Promise<User | undefined> {
    return await this.userRepository.login(credentials);
  }

  async logout(): Promise<void> {
    // Logout simplificado sin sesiones
  }


}

