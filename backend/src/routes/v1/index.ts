import { Router } from "express";
import { usersRoutes } from "./usersRoutes";
import { ordersRoutes } from "./ordersRoutes";
import { productosRoutes } from "./productosRoutes";
import { categoriasRoutes } from "./categoriasRoutes";
import { cartRoutes } from "./cartRoutes";

export const v1 = () => {
  const router = Router();

  router.use("/users", usersRoutes());
  router.use("/orders", ordersRoutes());
  router.use("/productos", productosRoutes());
  router.use("/categorias", categoriasRoutes());
  router.use("/cart", cartRoutes());

  return router;
};
