import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const REFRESH_LIFETIME = 1000 * 60 * 60 * 24 * 7; // 7 días
const ROTATION_THRESHOLD = 1000 * 60 * 60 * 24;   // Rotar si falta < 1 día

export function generateAccessToken(payload: object) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
}
export function generateRefreshToken() {
    return jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_LIFETIME });
}

export async function hashToken(token: string) {
    return await bcrypt.hash(token, 10);
}

export async function verifyHashedToken(token: string, hashed: string) {
    return await bcrypt.compare(token, hashed);
}

export function verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export function getRefreshExpiryDate() {
    return new Date(Date.now() + REFRESH_LIFETIME);
}

export function shouldRotate(expiresAt: Date) {
    return expiresAt.getTime() - Date.now() < ROTATION_THRESHOLD;
}
