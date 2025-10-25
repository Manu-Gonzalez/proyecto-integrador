// import { Router } from "express";
// import OrdersController from "@app/Orders/controller";
// import { authMiddlewareJWT } from "@app/users/middleware";
// import { container } from "src/app";

// export const OrderssRoutes = () => {
//     const router = Router();
//     const OrdersController =
//         container.resolve<OrdersController>("Orderss-controller");

//     router.get("/", authMiddlewareJWT, OrdersController.getAll);

//     router.post("/add", authMiddlewareJWT, OrdersController.create);

//     router.get("/:id", authMiddlewareJWT, OrdersController.getById)
//     return router;
// };
