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
exports.authMiddlewareJWT = void 0;
const token_1 = require("../../shared/utils/token");
const CustomizedError_1 = __importDefault(require("../../shared/classes/CustomizedError"));
const authMiddlewareJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const headerAuth = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ");
    if (!headerAuth) {
        return next(new CustomizedError_1.default("Autorizacion requerida, esquema de autorizacion y token", 401));
    }
    else if (headerAuth[0] !== "Bearer") {
        return next(new CustomizedError_1.default("Formato de token inválido ingrese el token en el siguiente formato -> Bearer MiToken", 400));
    }
    else if (headerAuth.length !== 2) {
        return next(new CustomizedError_1.default("Token requerido", 401));
    }
    const token = headerAuth[1];
    try {
        const payload = (0, token_1.verifyAccessToken)(token);
        req.user = payload;
        next();
    }
    catch (error) {
        return next(new CustomizedError_1.default("Token inválido o expirado", 403));
    }
});
exports.authMiddlewareJWT = authMiddlewareJWT;
