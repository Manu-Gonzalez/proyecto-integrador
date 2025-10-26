import UserServices from "./UserService";
import { ExpressFunction } from "../../shared/types/ExpressFunction"
import CustomizedError from "src/shared/classes/CustomizedError";
import { UserCreate } from "./models/UserTypes";
import bcrypt from "bcryptjs";

export default class AuthController {
    constructor(private readonly UserService: UserServices) { }

    public login: ExpressFunction = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await this.UserService.login({ email, password });
            if (user) {
                return res.json({ message: "Login exitoso", user });
            }
            next(new CustomizedError("Credenciales inválidas", 401));
        } catch (error) {
            next(error);
        }
    }


    public register: ExpressFunction = async (req, res, next) => {
        try {
            const { nombre, email, password, rol }: UserCreate = req.body;
            const user: UserCreate = { nombre, email, password, rol }
            const userCreated = await this.UserService.create(user);

            res.status(201).json(userCreated);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    }

    public logout: ExpressFunction = async (req, res, next) => {
        try {
            res.json({ message: "Sesión cerrada" });
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    }

    public getAll: ExpressFunction = async (req, res, next) => {
        try {
            const users = await this.UserService.getAll();
            res.status(200).json(users);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    }
}
