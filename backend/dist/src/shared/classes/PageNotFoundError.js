"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomizedError_1 = __importDefault(require("./CustomizedError"));
class NotFoundError extends CustomizedError_1.default {
    constructor(message = "Página no encontrada") {
        super(message, 404);
    }
}
exports.default = NotFoundError;
