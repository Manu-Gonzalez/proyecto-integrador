import { injectable, inject } from 'tsyringe';
import type { Request, Response } from 'express';
import type { CreateUserUseCase } from '@application/use-cases/create-user-use-case';

@injectable()
export class UserController {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: CreateUserUseCase
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, email } = req.body;
      const user = await this.createUserUseCase.execute({ nombre, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}