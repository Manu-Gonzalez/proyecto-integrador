import { Router } from "express";

export const ordersRoutes = () => {
    const router = Router();

    router.get("/", (req, res) => {
        res.json({ message: "Orders endpoint" });
    });

    return router;
};
