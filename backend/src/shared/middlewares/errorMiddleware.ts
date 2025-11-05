import { Request, Response, NextFunction } from "express";
import CustomizedError from '../classes/CustomizedError';

const errorHandler = (err: Error | CustomizedError, req: Request, res: Response, next: NextFunction) => {

    const time = Date.now();

    if (err instanceof CustomizedError) {
        return res.status(err.statusCode).json({
            message: err.message,
            host: req.host,
            url: req.originalUrl,
            method: req.method,
            statusCode: err.statusCode,
            time: time,
        });
    }
    console.log(err);
    return res.status(500).json({
        message: "Error interno del servidor",
        host: req.host,
        url: req.originalUrl,
        method: req.method,
        statusCode: 500,
        time: time,
    });

};

export default errorHandler;
