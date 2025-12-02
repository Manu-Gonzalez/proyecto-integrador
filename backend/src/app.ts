import express from "express";
import { v1 } from "./routes/v1";
import { container } from "@diContainer/container";
import { Request, Response } from "express";
import errorHandler from "./shared/middlewares/errorMiddleware";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const buildApp = () => {
  const app = express();

  // CORS configuration
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
