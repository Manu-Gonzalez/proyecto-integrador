import { UserRole } from "@prisma/client";
import { User } from "./User";

export type UserCreate = {
  nombre: string;
  email: string;
  password: string;
  rol?: UserRole;
};

export interface UserWithoutPassword {
  id: number;
  nombre: string;
  email: string;
  rol: UserRole;
}


