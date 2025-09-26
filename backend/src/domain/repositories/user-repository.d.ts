import type { BaseRepository } from './base-repository';
import type { User } from '@domain/entities/user';
export interface UserRepository extends BaseRepository<User, string> {
    findByEmail(email: string): Promise<User | null>;
}
//# sourceMappingURL=user-repository.d.ts.map