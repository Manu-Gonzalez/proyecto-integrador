import { Router } from "express";
import { usersRoutes } from "./usersRoutes";
import { clientsRoutes } from "./clientsRoutes";

export const v1 = () => {
  const router = Router();

  router.use("/users", usersRoutes());
  router.use("/clients", clientsRoutes());

  return router;
};
