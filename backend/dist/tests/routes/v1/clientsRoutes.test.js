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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("src/app");
const InMemoryClientsRepository_1 = require("@app/clients/repositories/InMemoryClientsRepository");
const crypto_1 = require("crypto");
const setupClientWithOrders_1 = require("./helpers/setupClientWithOrders");
const toExpectedClientDetailsResponse_1 = require("./helpers/toExpectedClientDetailsResponse");
describe("Clients routes v1", () => {
    const fixedDate = new Date("2025-09-08T00:00:00Z");
    beforeAll(() => {
        vi.setSystemTime(fixedDate);
    });
    afterAll(() => {
        vi.useRealTimers();
    });
    describe("GET /v1/clients", () => {
        it("Si no hay datos en el repositorio deberia devolver un array vacio.", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientsRepository = new InMemoryClientsRepository_1.InMemoryClientsRepository([]);
            app_1.container.registerInstance("clients-repository", clientsRepository);
            const app = (0, app_1.buildApp)();
            const response = yield (0, supertest_1.default)(app).get("/v1/clients");
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual([]);
        }));
        it("Si hay clientes en el repositorio deberia devolvermelos en un array.", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientsRepository = new InMemoryClientsRepository_1.InMemoryClientsRepository([]);
            const mockedClient = {
                firstName: "Jhon",
                lastName: "Doe",
                email: "jhon@doe.com",
                address: "JhonDoeStreet 1109",
                city: "Moreno City",
                dni: "12345678",
            };
            yield clientsRepository.create(mockedClient);
            app_1.container.registerInstance("clients-repository", clientsRepository);
            const app = (0, app_1.buildApp)();
            const response = yield (0, supertest_1.default)(app).get("/v1/clients");
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual([
                {
                    id: expect.any(String),
                    firstName: "Jhon",
                    lastName: "Doe",
                    email: "jhon@doe.com",
                    address: "JhonDoeStreet 1109",
                    city: "Moreno City",
                    dni: "12345678",
                    registeredAt: fixedDate.toISOString(),
                },
            ]);
        }));
    });
    describe("GET /v1/clients/:id", () => {
        it("Si no existe el cliente deberia responder con status 404.", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientId = (0, crypto_1.randomUUID)();
            const clientsRepository = new InMemoryClientsRepository_1.InMemoryClientsRepository([]);
            app_1.container.registerInstance("clients-repository", clientsRepository);
            const app = (0, app_1.buildApp)();
            const response = yield (0, supertest_1.default)(app).get(`/v1/clients/${clientId}`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expect.objectContaining({
                message: `No existe el cliente con id: '${clientId}'.`,
            }));
        }));
        it("Si el cliente existe deveria devolvermelo junto con sus pedidos.", () => __awaiter(void 0, void 0, void 0, function* () {
            const { client, orders } = (0, setupClientWithOrders_1.setupClientWithOrders)();
            const app = (0, app_1.buildApp)();
            const response = yield (0, supertest_1.default)(app).get(`/v1/clients/${client.id}`);
            expect(response.body).toStrictEqual((0, toExpectedClientDetailsResponse_1.toExpectedClientDetailsResponse)(client, orders));
        }));
    });
});
