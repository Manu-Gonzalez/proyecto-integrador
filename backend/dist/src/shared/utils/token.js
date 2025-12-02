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
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.hashToken = hashToken;
exports.verifyHashedToken = verifyHashedToken;
exports.verifyAccessToken = verifyAccessToken;
exports.getRefreshExpiryDate = getRefreshExpiryDate;
exports.shouldRotate = shouldRotate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_LIFETIME = 1000 * 60 * 60 * 24 * 7; // 7 días
const ROTATION_THRESHOLD = 1000 * 60 * 60 * 24; // Rotar si falta < 1 día
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
}
function generateRefreshToken() {
    return jsonwebtoken_1.default.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_LIFETIME });
}
function hashToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.hash(token, 10);
    });
}
function verifyHashedToken(token, hashed) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(token, hashed);
    });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
}
function getRefreshExpiryDate() {
    return new Date(Date.now() + REFRESH_LIFETIME);
}
function shouldRotate(expiresAt) {
    return expiresAt.getTime() - Date.now() < ROTATION_THRESHOLD;
}
