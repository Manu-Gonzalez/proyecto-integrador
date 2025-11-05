"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeUsersRepository = void 0;
const crypto_1 = require("crypto");
class FakeUsersRepository {
    constructor(users) {
        this.users = users !== null && users !== void 0 ? users : [];
    }
    getByUsername(username) {
        return Promise.resolve(this.users.find((user) => user.username === username));
    }
    create(user) {
        const newUser = Object.assign(Object.assign({}, user), { id: (0, crypto_1.randomUUID)(), createdAt: new Date() });
        this.users.push(newUser);
        return Promise.resolve(newUser);
    }
}
exports.FakeUsersRepository = FakeUsersRepository;
