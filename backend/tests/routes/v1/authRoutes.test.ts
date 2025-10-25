import request from "supertest";
import { buildApp, container } from "src/app";
import { FakeUsersRepository } from "tests/users/FakeUsersRepository";

describe("Auth Routes v1", () => {
  describe("POST /v1/auth/register", () => {
    it("Si el nombre de usuario ya esta registrado deberia responderme con un error.", async () => {
      const user = { username: "JhonDoe", password: "JhonDoe123" };
      const usersRepository = new FakeUsersRepository();
      await usersRepository.create(user);
      container.registerInstance("users-repository", usersRepository);
      const app = buildApp();

      const response = await request(app).post("/v1/auth/register").send(user);

      expect.soft(response.statusCode).toBe(409);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: `El nombre de usuario '${user.username}' ya se encuentra registrado.`,
        })
      );
    });

    it("Si el usuario no existe deberia guardarlo.", async () => {
      const user = { username: "JhonDoe", password: "JhonDoe123" };
      const usersRepository = new FakeUsersRepository();
      container.registerInstance("users-repository", usersRepository);
      const app = buildApp();

      const response = await request(app).post("/v1/auth/register").send(user);
      const existingUser = await usersRepository.getByUsername(user.username);

      expect.soft(response.statusCode).toBe(201);
      expect(existingUser).toEqual(
        expect.objectContaining({
          ...user,
          id: expect.any(String),
          createdAt: expect.any(String),
        })
      );
    });
  });
});
