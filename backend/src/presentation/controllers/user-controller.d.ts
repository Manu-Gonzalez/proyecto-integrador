import type { Request, Response } from 'express';
import type { CreateUserUseCase } from '@application/use-cases/create-user-use-case';
export declare class UserController {
    private createUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase);
    createUser(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=user-controller.d.ts.map