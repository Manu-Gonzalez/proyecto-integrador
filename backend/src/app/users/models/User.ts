/*
    Muchas veces es mas conveniente usar clases en lugar de interfaces para modelar
  nuestros datos. Las clases nos permite tener logica asociada a ese conjunto de
  datos, ademas de que evitamos que nos pasen propiedades extra.
*/

import { UserRole } from "@prisma/client";

export class User {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly email: string,
    public readonly password: string,
    public readonly rol: UserRole = UserRole.cliente
  ) { }

  isAdmin(): boolean {
    return this.rol === UserRole.admin;
  }

  isEmpleado(): boolean {
    return this.rol === UserRole.empleado || this.rol === UserRole.admin;
  }
}
