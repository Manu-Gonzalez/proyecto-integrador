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
exports.ProductoController = void 0;
const CustomizedError_1 = __importDefault(require("../../shared/classes/CustomizedError"));
class ProductoController {
    constructor(productoService) {
        this.productoService = productoService;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productos = yield this.productoService.getAll();
                res.json(productos);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.getById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const producto = yield this.productoService.getById(id);
                if (!producto) {
                    return next(new CustomizedError_1.default("Producto no encontrado", 404));
                }
                res.json(producto);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const producto = yield this.productoService.create(req.body);
                res.status(201).json(producto);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const producto = yield this.productoService.update(id, req.body);
                res.json(producto);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield this.productoService.delete(id);
                res.status(204).send();
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
    }
}
exports.ProductoController = ProductoController;
