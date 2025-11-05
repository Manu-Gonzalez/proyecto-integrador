"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRoutes = void 0;
const express_1 = require("express");
const ordersRoutes = () => {
    const router = (0, express_1.Router)();
    router.get("/", (req, res) => {
        res.json({ message: "Orders endpoint" });
    });
    return router;
};
exports.ordersRoutes = ordersRoutes;
