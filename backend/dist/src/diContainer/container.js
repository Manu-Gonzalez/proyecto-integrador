"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const DiContainer_1 = require("./DiContainer");
const UserController_1 = __importDefault(require("../app/users/UserController"));
const UserService_1 = __importDefault(require("../app/users/UserService"));
const PrismaUserRepository_1 = require("../app/users/repositories/PrismaUserRepository");
const container = new DiContainer_1.DiContainer();
exports.container = container;
//INTANCIA LAS DEPENDENCIAS DEL MODULO: USERS
container.register("users-repository", PrismaUserRepository_1.PrismaUserRepository);
container.register("users-services", UserService_1.default, ["users-repository"]);
container.register("users-controller", UserController_1.default, ["users-services"]);
