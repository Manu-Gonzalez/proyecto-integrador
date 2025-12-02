"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
const express_1 = require("express");
const usersRoutes_1 = require("./usersRoutes");
const ordersRoutes_1 = require("./ordersRoutes");
const productosRoutes_1 = require("./productosRoutes");
const categoriasRoutes_1 = require("./categoriasRoutes");
const v1 = () => {
    const router = (0, express_1.Router)();
    router.use("/users", (0, usersRoutes_1.usersRoutes)());
    router.use("/orders", (0, ordersRoutes_1.ordersRoutes)());
    router.use("/productos", (0, productosRoutes_1.productosRoutes)());
    router.use("/categorias", (0, categoriasRoutes_1.categoriasRoutes)());
    return router;
};
exports.v1 = v1;
