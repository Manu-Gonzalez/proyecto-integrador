import UserServices from "./UserService";
import { ExpressFunction } from "../../shared/types/ExpressFunction"
import CustomizedError from "src/shared/classes/CustomizedError";
import { UserCreate } from "./models/UserTypes";
import bcrypt from "bcryptjs";

export default class AuthController {
    constructor(private readonly UserService: UserServices) { }

    public login: ExpressFunction = async (req, res, next) => {
        const device = req.headers["user-agent"];

        if (!device) {
            return next(new CustomizedError("Falta el header 'user-agent'", 400));
        }
        const { username, password, profileImage }: UserCreate = req.body;
        try {
            const tokens = await this.UserService.login({ username, password }, device, req.ip);
            if (tokens) {

                const { accessToken, refreshToken } = tokens;
                return res
                    .cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax",
                    })
                    .json({ accessToken });
            }
            next(new CustomizedError("Error en el logueo, las credenciales pueden ser invalidas", 401));
        } catch (error) {
            next(error);
        }
    }


    public register: ExpressFunction = async (req, res, next) => {
        try {
            const { username, password, profileImage }: UserCreate = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user: UserCreate = { username, password: hashedPassword, profileImage: profileImage || "" }
            const userCreated = await this.UserService.create(user);

            res.status(201).json(userCreated);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    }

    public logout: ExpressFunction = async (req, res, next) => {
        const { refreshToken } = req.cookies;
        try {
            await this.UserService.logout(refreshToken);
            res.clearCookie("refreshToken").json({ message: "Sesión cerrada" });
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
