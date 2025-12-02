"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PageNotFoundError_1 = __importDefault(require("../classes/PageNotFoundError"));
const notFoundHandler = (req, res, next) => {
    next(new PageNotFoundError_1.default(`La ruta ${req.host + req.originalUrl} no existe`));
};
exports.default = notFoundHandler;
