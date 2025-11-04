import { buildApp } from "src/app";
import request from "supertest";

describe("app", () => {
  describe("GET /", () => {
    it("Deberia responder con status 200 y un mensaje hello world.", async () => {
      const app = buildApp();

      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({ message: "Hello world!" });
    });
  });

  describe("Middleware de errores", () => {
    it("Si no se encuentra una ruta deberia responder con status 404 y un error formateado.", async () => {
      const app = buildApp();

      const response = await request(app).get("/ruta-inexistente");

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          method: "GET",
          path: "/ruta-inexistente",
          statusCode: 404,
          message: "No se encontro la ruta '/ruta-inexistente'.",
        })
      );
    });
  });
});
