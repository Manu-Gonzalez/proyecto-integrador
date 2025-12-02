import { MesaService } from "./MesaService";
import { ExpressFunction } from "../../shared/types/ExpressFunction";
import CustomizedError from "../../shared/classes/CustomizedError";
import { MesaCreate, MesaUpdate } from "./models/MesaTypes";

export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  public getAllMesas: ExpressFunction = async (req, res, next) => {
    try {
      const mesas = await this.mesaService.getAllMesas();
      res.json(mesas);
    } catch (error: any) {
      next(new CustomizedError(error.message, 500));
    }
  };

  public getMesaById: ExpressFunction = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const mesa = await this.mesaService.getMesaById(id);
      if (!mesa) {
        return next(new CustomizedError("Mesa no encontrada", 404));
      }
      res.json(mesa);
    } catch (error: any) {
      next(new CustomizedError(error.message, 500));
    }
  };

  public createMesa: ExpressFunction = async (req, res, next) => {
    try {
      const data: MesaCreate = req.body;
      const mesa = await this.mesaService.createMesa(data);
      res.status(201).json(mesa);
    } catch (error: any) {
      next(new CustomizedError(error.message, 400));
    }
  };

  public updateMesa: ExpressFunction = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const data: MesaUpdate = req.body;
      const mesa = await this.mesaService.updateMesa(id, data);
      if (!mesa) {
        return next(new CustomizedError("Mesa no encontrada", 404));
      }
      res.json(mesa);
    } catch (error: any) {
      next(new CustomizedError(error.message, 400));
    }
  };

  public deleteMesa: ExpressFunction = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.mesaService.deleteMesa(id);
      if (!deleted) {
        return next(new CustomizedError("Mesa no encontrada", 404));
      }
      res.json({ message: "Mesa eliminada exitosamente" });
    } catch (error: any) {
      next(new CustomizedError(error.message, 500));
    }
  };
}