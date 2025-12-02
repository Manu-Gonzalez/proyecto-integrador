"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    profileImage: zod_1.z
        .string()
        .url("Debe ser una URL válida")
        .optional()
        .default(""),
    username: zod_1.z
        .string()
        .min(2, "El username debe tener al menos 2 caracteres")
        .max(50, "El username no puede superar los 50 caracteres")
        .trim()
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El username solo puede contener letras y espacios"),
    password: zod_1.z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(64, "La contraseña no puede superar los 64 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[\W_]/, "Debe contener al menos un símbolo especial"),
});
exports.loginUserSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(2, "El username debe tener al menos 2 caracteres")
        .max(50, "El username no puede superar los 50 caracteres")
        .trim()
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El username solo puede contener letras y espacios"),
    password: zod_1.z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(64, "La contraseña no puede superar los 64 caracteres"),
});
