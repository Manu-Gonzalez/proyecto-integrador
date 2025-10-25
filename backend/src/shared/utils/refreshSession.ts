import { prisma } from "../../config/prismaClient";
import * as tokenFunctions from "../utils/token"
export const refreshSession = async (providedRefreshToken: string, device: string) => {
    const sessions = await prisma.session.findMany({
        where: { device, isValid: true },
        include: { user: true }
    });

    let validSession = null;
    for (const session of sessions) {
        const match = await tokenFunctions.verifyHashedToken(providedRefreshToken, session.refreshTokenHash);
        if (match && session.expiresAt > new Date()) {
            validSession = session;
            break;
        }
    }

    if (!validSession) throw new Error("Refresh token inválido");

    const newAccessToken = tokenFunctions.generateAccessToken({ userId: validSession.user.id });

    let refreshTokenToReturn = providedRefreshToken;
    if (tokenFunctions.shouldRotate(validSession.expiresAt)) {
        const newRefreshToken = tokenFunctions.generateRefreshToken();
        const newRefreshTokenHash = await tokenFunctions.hashToken(newRefreshToken);

        await prisma.session.update({
            where: { id: validSession.id },
            data: {
                refreshTokenHash: newRefreshTokenHash,
                expiresAt: tokenFunctions.getRefreshExpiryDate()
            }
        });

        refreshTokenToReturn = newRefreshToken;
    }

    return { accessToken: newAccessToken, refreshToken: refreshTokenToReturn };
}