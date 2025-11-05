"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientBuilder = void 0;
const crypto_1 = require("crypto");
class ClientBuilder {
    constructor() {
        this.client = {
            id: (0, crypto_1.randomUUID)(),
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
exports.ClientBuilder = ClientBuilder;
