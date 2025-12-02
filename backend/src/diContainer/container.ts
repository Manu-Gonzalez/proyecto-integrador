import { DiContainer } from "./DiContainer";
import UserController from "../app/users/UserController";
import UserService from "../app/users/UserService";
import { PrismaUserRepository } from "../app/users/repositories/PrismaUserRepository";
import { OrderController } from "../app/orders/controller";
import { OrderService } from "../app/orders/service";
import { PrismaOrderRepository } from "../app/orders/repositories/PrismasOrderRepository";
import { CartController } from "../app/cart/controller";
import { CartService } from "../app/cart/service";
import { PrismaCartRepository } from "../app/cart/repositories/PrismaCartRepository";
import { MesaController } from "../app/mesas/MesaController";
import { MesaService } from "../app/mesas/MesaService";
import { PrismaMesasRepository } from "../app/mesas/repositories/PrismaMesaRepository";

const container = new DiContainer();

//INTANCIA LAS DEPENDENCIAS DEL MODULO: USERS
container.register("users-repository", PrismaUserRepository);
container.register("users-services", UserService, ["users-repository"]);
container.register("users-controller", UserController, ["users-services"]);

//INSTANCIA LAS DEPENDENCIAS DEL MODULO: ORDERS
container.register("orders-repository", PrismaOrderRepository);
container.register("orders-service", OrderService, ["orders-repository"]);
container.register("orders-controller", OrderController, ["orders-service"]);

//INSTANCIA LAS DEPENDENCIAS DEL MODULO: CART
container.register("cart-repository", PrismaCartRepository);
container.register("cart-service", CartService, ["cart-repository"]);
container.register("cart-controller", CartController, ["cart-service"]);

//INSTANCIA LAS DEPENDENCIAS DEL MODULO: MESAS
container.register("mesas-repository", PrismaMesasRepository);
container.register("mesas-service", MesaService, ["mesas-repository"]);
container.register("mesa-controller", MesaController, ["mesas-service"]);

export { container };
