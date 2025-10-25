import request from "supertest";
import { buildApp, container } from "src/app";
import { InMemoryClientsRepository } from "@app/clients/repositories/InMemoryClientsRepository";
import { randomUUID } from "crypto";
import { setupClientWithOrders } from "./helpers/setupClientWithOrders";
import { toExpectedClientDetailsResponse } from "./helpers/toExpectedClientDetailsResponse";

describe("Clients routes v1", () => {
  const fixedDate = new Date("2025-09-08T00:00:00Z");

  beforeAll(() => {
    vi.setSystemTime(fixedDate);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe("GET /v1/clients", () => {
    it("Si no hay datos en el repositorio deberia devolver un array vacio.", async () => {
      const clientsRepository = new InMemoryClientsRepository([]);
      container.registerInstance("clients-repository", clientsRepository);
      const app = buildApp();

      const response = await request(app).get("/v1/clients");

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual([]);
    });

    it("Si hay clientes en el repositorio deberia devolvermelos en un array.", async () => {
      const clientsRepository = new InMemoryClientsRepository([]);
      const mockedClient = {
        firstName: "Jhon",
        lastName: "Doe",
        email: "jhon@doe.com",
        address: "JhonDoeStreet 1109",
        city: "Moreno City",
        dni: "12345678",
      };
      await clientsRepository.create(mockedClient);
      container.registerInstance("clients-repository", clientsRepository);
      const app = buildApp();

      const response = await request(app).get("/v1/clients");

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
    });
  });

  describe("GET /v1/clients/:id", () => {
    it("Si no existe el cliente deberia responder con status 404.", async () => {
      const clientId = randomUUID();
      const clientsRepository = new InMemoryClientsRepository([]);
      container.registerInstance("clients-repository", clientsRepository);
      const app = buildApp();

      const response = await request(app).get(`/v1/clients/${clientId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: `No existe el cliente con id: '${clientId}'.`,
        })
      );
    });

    it("Si el cliente existe deveria devolvermelo junto con sus pedidos.", async () => {
      const { client, orders } = setupClientWithOrders();
      const app = buildApp();

      const response = await request(app).get(`/v1/clients/${client.id}`);

      expect(response.body).toStrictEqual(
        toExpectedClientDetailsResponse(client, orders)
      );
    });
  });
});
