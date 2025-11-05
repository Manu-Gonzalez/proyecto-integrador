"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomizedError_1 = __importDefault(require("src/shared/classes/CustomizedError"));
class AuthController {
    constructor(UserService) {
        this.UserService = UserService;
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield this.UserService.login({ email, password });
                if (user) {
                    return res.json({ message: "Login exitoso", user });
                }
                next(new CustomizedError_1.default("Credenciales inválidas", 401));
            }
            catch (error) {
                next(error);
            }
        });
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, email, password, rol } = req.body;
                const user = { nombre, email, password, rol };
                const userCreated = yield this.UserService.create(user);
                res.status(201).json(userCreated);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({ message: "Sesión cerrada" });
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.UserService.getAll();
                res.status(200).json(users);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
    }
}
exports.default = AuthController;
