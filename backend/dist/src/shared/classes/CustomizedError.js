"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomizedError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CustomizedError;
