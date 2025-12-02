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
exports.CategoriaController = void 0;
const CustomizedError_1 = __importDefault(require("../../shared/classes/CustomizedError"));
class CategoriaController {
    constructor(categoriaService) {
        this.categoriaService = categoriaService;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categorias = yield this.categoriaService.getAll();
                res.json(categorias);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.getById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const categoria = yield this.categoriaService.getById(id);
                if (!categoria) {
                    return next(new CustomizedError_1.default("Categoría no encontrada", 404));
                }
                res.json(categoria);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield this.categoriaService.create(req.body);
                res.status(201).json(categoria);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const categoria = yield this.categoriaService.update(id, req.body);
                res.json(categoria);
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield this.categoriaService.delete(id);
                res.status(204).send();
            }
            catch (error) {
                next(new CustomizedError_1.default(error.message, 500));
            }
        });
    }
}
exports.CategoriaController = CategoriaController;
