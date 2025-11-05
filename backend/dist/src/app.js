"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.buildApp = void 0;
const express_1 = __importDefault(require("express"));
const v1_1 = require("./routes/v1");
const container_1 = require("@diContainer/container");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return container_1.container; } });
const errorMiddleware_1 = __importDefault(require("./shared/middlewares/errorMiddleware"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const buildApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.disable("x-powered-by");
    app.use("/v1", (0, v1_1.v1)());
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swagger_1.swaggerSpec);
    });
    app.get("/", (req, res) => {
        res.status(200).json({ message: "Hello world!" });
    });
    app.use(errorMiddleware_1.default);
    return app;
};
exports.buildApp = buildApp;
