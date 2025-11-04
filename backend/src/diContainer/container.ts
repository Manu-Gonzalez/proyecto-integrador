import { DiContainer } from "./DiContainer";
import UserController from "../app/users/UserController";
import UserService from "../app/users/UserService";
import { PrismaUserRepository } from "../app/users/repositories/PrismaUserRepository"

const container = new DiContainer();

//INTANCIA LAS DEPENDENCIAS DEL MODULO: USERS
container.register("users-repository", PrismaUserRepository);
container.register("users-services", UserService, ["users-repository"]);
container.register("users-controller", UserController, ["users-services"])

export { container };
