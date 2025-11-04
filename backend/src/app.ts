import express from "express";
import { v1 } from "./routes/v1";
import { container } from "@diContainer/container";
import { Request, Response } from "express";
import errorHandler from "./shared/middlewares/errorMiddleware";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const buildApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.disable("x-powered-by");

  app.use("/v1", v1());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello world!" });
  });

  app.use(errorHandler);

  return app;
};

export { buildApp, container };
