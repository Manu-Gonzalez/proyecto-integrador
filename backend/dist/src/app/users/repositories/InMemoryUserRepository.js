"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryClientsRepository = void 0;
const crypto_1 = require("crypto");
const User_1 = require("../models/User");
class InMemoryClientsRepository {
    constructor(clients) {
        this.clients = clients !== null && clients !== void 0 ? clients : [];
    }
    getAll() {
        return Promise.resolve(this.clients);
    }
    getById(id) {
        return Promise.resolve(this.clients.find((client) => client.id === id));
    }
    create(client) {
        const newClient = new User_1.Client((0, crypto_1.randomUUID)(), client.firstName, client.lastName, client.email, client.dni, client.cityId, client.address, new Date());
        this.clients.push(newClient);
        return Promise.resolve(newClient);
    }
}
exports.InMemoryClientsRepository = InMemoryClientsRepository;
