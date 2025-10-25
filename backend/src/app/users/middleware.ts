import { verifyAccessToken } from "../../shared/utils/token"
import CustomizedError from "../../shared/classes/CustomizedError";
import { ExpressFunction } from "src/shared/types/ExpressFunction";
import { refreshSession } from "../../shared/utils/refreshSession";


export const authMiddlewareJWT: ExpressFunction = async (req, res, next) => {
    const headerAuth = req.headers.authorization?.split(" ");
    const refreshTokensSession = req.cookies?.refreshToken;

    if (!refreshTokensSession) {
        return next(new CustomizedError("Refresh token no proporcionado", 401));
    }

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
        if (error.name === "TokenExpiredError") {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshSession(refreshTokensSession, req.headers["user-agent"] as string);
            res
                .cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                })
                .json({ newAccessToken });
        }
        return next(new CustomizedError("Token inválido o expirado", 403));
    }
}
