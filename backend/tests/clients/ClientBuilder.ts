import { randomUUID } from "crypto";
import TestClient from "./TestClient";

export class ClientBuilder {
  private client: TestClient;

  constructor() {
    this.client = {
      id: randomUUID(),
      firstName: "Jhon",
      lastName: "Doe",
      address: "JhonDoeStreet 123",
      cityId: 1,
      dni: "12345678",
      email: "jhon@doe.com",
      registeredAt: new Date(),
    };
  }

  build() {
    return this.client;
  }
}
