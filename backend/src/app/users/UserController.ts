import UserServices from "./UserService";
import { Request, Response, NextFunction } from "express";
import CustomizedError from "../../shared/classes/CustomizedError";
import { UserCreate } from "./models/UserTypes";
import bcrypt from "bcryptjs";

export default class AuthController {
    constructor(private readonly UserService: UserServices) { }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {
            const result = await this.UserService.login({ email, password });
            if (result) {
                return res.json({ message: "Login exitoso", user: result.user, token: result.token });
            }
            next(new CustomizedError("Credenciales inválidas", 401));
        } catch (error) {
            next(error);
        }
    }


    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { nombre, email, password, rol }: UserCreate = req.body;
            const user: UserCreate = { nombre, email, password, rol }
            const userCreated = await this.UserService.create(user);

            res.status(201).json(userCreated);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json({ message: "Sesión cerrada" });
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.UserService.getAll();
            res.status(200).json(users);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    }
}
