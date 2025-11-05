"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("src/app");
const supertest_1 = __importDefault(require("supertest"));
describe("app", () => {
    describe("GET /", () => {
        it("Deberia responder con status 200 y un mensaje hello world.", () => __awaiter(void 0, void 0, void 0, function* () {
            const app = (0, app_1.buildApp)();
            const response = yield (0, supertest_1.default)(app).get("/");
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ message: "Hello world!" });
        }));
    });
    describe("Middleware de errores", () => {
        it("Si no se encuentra una ruta deberia responder con status 404 y un error formateado.", () => __awaiter(void 0, void 0, void 0, function* () {
            const app = (0, app_1.buildApp)();
            const response = yield (0, supertest_1.default)(app).get("/ruta-inexistente");
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expect.objectContaining({
                method: "GET",
                path: "/ruta-inexistente",
                statusCode: 404,
                message: "No se encontro la ruta '/ruta-inexistente'.",
            }));
        }));
    });
});
