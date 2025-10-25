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

  async getById(id: string): Promise<UserWithoutPassword | undefined> {
    return await this.userRepository?.getById(id);
  }

  async create(user: UserCreate): Promise<UserWithoutPassword> {
    return await this.userRepository?.create(user);
  }

  async login(user: UserCreate, device: string, ip?: string): Promise<{ accessToken: string, refreshToken: string } | undefined> {
    const { username, password } = user;

    const userIsAuth = await this.userRepository.login(user);

    if (!userIsAuth) return undefined

    const accessToken = tokenFunctions.generateAccessToken(userIsAuth);
    const refreshToken = tokenFunctions.generateRefreshToken();

    const refreshTokenHash = await tokenFunctions.hashToken(refreshToken);
    await prisma.session.create({
      data: {
        userId: userIsAuth.id,
        device,
        ip,
        refreshTokenHash,
        expiresAt: tokenFunctions.getRefreshExpiryDate(),
      }
    });
    return { accessToken, refreshToken };
  }

  async logout(providedRefreshToken: string) {
    const sessions = await prisma.session.findMany({ where: { isValid: true } });

    for (const session of sessions) {
      const match = await tokenFunctions.verifyHashedToken(providedRefreshToken, session.refreshTokenHash);
      if (match) {
        await prisma.session.update({
          where: { id: session.id },
          data: { isValid: false }
        });
        return;
      }
    }
  }


}

