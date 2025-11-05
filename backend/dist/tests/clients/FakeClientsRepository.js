"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeClientsRepository = void 0;
class FakeClientsRepository {
    constructor(clients) {
        this.clients = clients !== null && clients !== void 0 ? clients : [];
    }
    getById(id) {
        return Promise.resolve(this.clients.find((client) => client.id === id));
    }
}
exports.FakeClientsRepository = FakeClientsRepository;
