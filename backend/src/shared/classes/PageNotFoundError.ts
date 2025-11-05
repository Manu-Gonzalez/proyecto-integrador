import GenericError from "./CustomizedError";

export default class NotFoundError extends GenericError {
    constructor(message: string = "Página no encontrada") {
        super(message, 404);
    }
}
