import { OrderService } from "./service";
import { ExpressFunction } from "../../shared/types/ExpressFunction";
import CustomizedError from "../../shared/classes/CustomizedError";
import { EstadoPedido } from "./models/Order";
import { OrderFilters } from "./models/OrderTypes";

export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    public getAll: ExpressFunction = async (req, res, next) => {
        try {
            const filters: OrderFilters = {};

            if (req.query.estado) {
                filters.estado = req.query.estado as string;
            }

            if (req.query.usuarioId) {
                filters.usuarioId = parseInt(req.query.usuarioId as string);
            }

            if (req.query.fechaDesde) {
                filters.fechaDesde = req.query.fechaDesde as string;
            }

            if (req.query.fechaHasta) {
                filters.fechaHasta = req.query.fechaHasta as string;
            }

            if (req.query.totalMin) {
                filters.totalMin = parseFloat(req.query.totalMin as string);
            }

            if (req.query.totalMax) {
                filters.totalMax = parseFloat(req.query.totalMax as string);
            }

            if (req.query.pagina) {
                filters.pagina = parseInt(req.query.pagina as string);
            }

            if (req.query.limite) {
                filters.limite = parseInt(req.query.limite as string);
            }

            if (req.query.ordenarPor) {
                filters.ordenarPor = req.query.ordenarPor as 'fecha' | 'total' | 'estado';
            }

            if (req.query.orden) {
                filters.orden = req.query.orden as 'asc' | 'desc';
            }

            const orders = await this.orderService.getAll(filters);
            res.json(orders);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public getById: ExpressFunction = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const order = await this.orderService.getById(id);
            if (!order) {
                return next(new CustomizedError("Pedido no encontrado", 404));
            }
            res.json(order);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public create: ExpressFunction = async (req, res, next) => {
        try {
            const order = await this.orderService.create(req.body);
            res.status(201).json(order);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };

    public updateEstado: ExpressFunction = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const { estado } = req.body;
            if (!Object.values(EstadoPedido).includes(estado)) {
                return next(new CustomizedError("Estado inválido", 400));
            }
            const order = await this.orderService.updateEstado(id, estado);
            res.json(order);
        } catch (error: any) {
            next(new CustomizedError(error.message, 500));
        }
    };
}