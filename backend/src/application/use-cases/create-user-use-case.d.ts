import type { UserRepository } from '@domain/repositories/user-repository';
import type { User } from '@domain/entities/user';
export interface CreateUserRequest {
    nombre: string;
    email: string;
}
export declare class CreateUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(request: CreateUserRequest): Promise<User>;
}
//# sourceMappingURL=create-user-use-case.d.ts.map