import { User } from "./User";

/* 
    Debido a que Client es una clase y posee metodos es mas conveniente usar Pick para 
  agarrar solo las propiedades.
*/

export type UserCreate = Pick<
  User,
  "username" | "password"
> & {
  profileImage?: string;
};

export interface UserWithoutPassword {
  id: string;
  profileImage: string;
  username: string;
  createdAt: Date;
}


