import { verifyAccessToken } from "../../shared/utils/token"
import CustomizedError from "../../shared/classes/CustomizedError";
import { Request, Response, NextFunction } from "express";

export const authMiddlewareJWT = async (req: Request, res: Response, next: NextFunction) => {
    const headerAuth = req.headers.authorization?.split(" ");

    if (!headerAuth) {
        return next(new CustomizedError("Autorizacion requerida, esquema de autorizacion y token", 401));
    } else if (headerAuth[0] !== "Bearer") {
        return next(new CustomizedError("Formato de token inválido ingrese el token en el siguiente formato -> Bearer MiToken", 400));
    } else if (headerAuth.length !== 2) {
        return next(new CustomizedError("Token requerido", 401));
    }

    const token = headerAuth[1];

    try {
        const payload = verifyAccessToken(token);
        (req as any).user = payload;
        next();
    } catch (error: any) {
        return next(new CustomizedError("Token inválido o expirado", 403));
    }
}
