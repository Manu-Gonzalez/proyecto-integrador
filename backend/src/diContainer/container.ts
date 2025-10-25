import { DiContainer } from "./DiContainer";
// para clientes
import ClientsServices from "src/app/clients/ClientsServices";
import ClientController from "../app/clients/ClientController"
import { PrismaClientRepository } from "@app/clients/repositories/PrismaClientRepository";
// para usuarios
import UserController from "@app/users/UserController";
import UserService from "@app/users/UserService";
import { PrismaUserRepository } from "../app/users/repositories/PrismaUserRepository"

const container = new DiContainer();

//INTANCIA LAS DEPENDENCIAS DEL MODULO: USERS
container.register("users-repository", PrismaUserRepository);
container.register("users-services", UserService, ["users-repository"]);
container.register("users-controller", UserController, ["users-services"])

//INTANCIA DE LAS DEPENDENCIAS MODULO: CLIENT
container.register("clients-repository", PrismaClientRepository);
container.register("clients-services", ClientsServices, ["clients-repository"]);
container.register("clients-controller", ClientController, ["clients-services"])

export { container };
