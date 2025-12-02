"use strict";
/*
    Muchas veces es mas conveniente usar clases en lugar de interfaces para modelar
  nuestros datos. Las clases nos permite tener logica asociada a ese conjunto de
  datos, ademas de que evitamos que nos pasen propiedades extra.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const client_1 = require("@prisma/client");
class User {
    constructor(id, nombre, email, password, rol = client_1.UserRole.cliente) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
    isAdmin() {
        return this.rol === client_1.UserRole.admin;
    }
    isEmpleado() {
        return this.rol === client_1.UserRole.empleado || this.rol === client_1.UserRole.admin;
    }
}
exports.User = User;
