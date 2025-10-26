import { ProductoService } from "./ProductoService";
import { ExpressFunction } from "../../shared/types/ExpressFunction";
import CustomizedError from "../../shared/classes/CustomizedError";

export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    public getAll: ExpressFunction = async (req, res, next) => {
        try {
            const productos = await this.productoService.getAll();
            res.json(productos);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public getById: ExpressFunction = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const producto = await this.productoService.getById(id);
            if (!producto) {
                return next(new CustomizedError("Producto no encontrado", 404));
            }
            res.json(producto);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public create: ExpressFunction = async (req, res, next) => {
        try {
            const producto = await this.productoService.create(req.body);
            res.status(201).json(producto);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public update: ExpressFunction = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const producto = await this.productoService.update(id, req.body);
            res.json(producto);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public delete: ExpressFunction = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            await this.productoService.delete(id);
            res.status(204).send();
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };
}