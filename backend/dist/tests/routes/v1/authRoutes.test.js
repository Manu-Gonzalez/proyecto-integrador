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
const FakeUsersRepository_1 = require("tests/users/FakeUsersRepository");
describe("Auth Routes v1", () => {
    describe("POST /v1/auth/register", () => {
        it("Si el nombre de usuario ya esta registrado deberia responderme con un error.", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = { username: "JhonDoe", password: "JhonDoe123" };
            const usersRepository = new FakeUsersRepository_1.FakeUsersRepository();
            yield usersRepository.create(user);
            app_1.container.registerInstance("users-repository", usersRepository);
            const app = (0, app_1.buildApp)();
            const response = yield (0, supertest_1.default)(app).post("/v1/auth/register").send(user);
            expect.soft(response.statusCode).toBe(409);
            expect(response.body).toEqual(expect.objectContaining({
                message: `El nombre de usuario '${user.username}' ya se encuentra registrado.`,
            }));
        }));
        it("Si el usuario no existe deberia guardarlo.", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = { username: "JhonDoe", password: "JhonDoe123" };
            const usersRepository = new FakeUsersRepository_1.FakeUsersRepository();
            app_1.container.registerInstance("users-repository", usersRepository);
            const app = (0, app_1.buildApp)();
            const response = yield (0, supertest_1.default)(app).post("/v1/auth/register").send(user);
            const existingUser = yield usersRepository.getByUsername(user.username);
            expect.soft(response.statusCode).toBe(201);
            expect(existingUser).toEqual(expect.objectContaining(Object.assign(Object.assign({}, user), { id: expect.any(String), createdAt: expect.any(String) })));
        }));
    });
});
