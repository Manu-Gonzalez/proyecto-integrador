import { CategoriaService } from "./CategoriaService";
import { ExpressFunction } from "../../shared/types/ExpressFunction";
import CustomizedError from "../../shared/classes/CustomizedError";

export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    public getAll: ExpressFunction = async (req, res, next) => {
        try {
            const categorias = await this.categoriaService.getAll();
            res.json(categorias);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public getById: ExpressFunction = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const categoria = await this.categoriaService.getById(id);
            if (!categoria) {
                return next(new CustomizedError("Categoría no encontrada", 404));
            }
            res.json(categoria);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public create: ExpressFunction = async (req, res, next) => {
        try {
            const categoria = await this.categoriaService.create(req.body);
            res.status(201).json(categoria);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public update: ExpressFunction = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const categoria = await this.categoriaService.update(id, req.body);
            res.json(categoria);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public delete: ExpressFunction = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            await this.categoriaService.delete(id);
            res.status(204).send();
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };
}