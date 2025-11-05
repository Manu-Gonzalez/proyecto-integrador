import { Router } from "express";

export default abstract class GenericRouter {
    private router: Router;

    constructor() {
        this.router = Router();
    }

    public init(): Router {
        return this.router;
    }
}