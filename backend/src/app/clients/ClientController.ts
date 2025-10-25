import ClientsServices from "./ClientsServices";
import { ExpressFunction } from "../../shared/types/ExpressFunction"


export default class ClientController {
    constructor(private clientsService: ClientsServices) { }

    public create: ExpressFunction = async (req, res, next) => {
        try {
            const user = req.body;
            if (!user) return res.status(400).json({ message: "error, ingrese todos los campos" });
            await this.clientsService.create(user);
            res.status(201).json(user);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error del servidor" });
        }
    };

    public getAll: ExpressFunction = async (req, res, next) => {
        try {
            const users = await this.clientsService.getAll();
            console.log(users)
            return res.json(users);
        } catch (error: any) {
            res.status(400).json({ message: "error interno del servidor" });
        }
    };

    public getById: ExpressFunction = async (req, res, next) => {
        try {
            const userId = req.params.id;
            const user = await this.clientsService.getById(userId);

            if (!user) return res.json({ message: "usuario inexistente" });

            return res.json(user);
        } catch (error: any) {
            res.status(400).json({ message: "error, ingrese el id" });
        }
    };
}
