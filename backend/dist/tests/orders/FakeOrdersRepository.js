"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeOrderRepository = void 0;
class FakeOrderRepository {
    constructor(orders) {
        this.orders = orders !== null && orders !== void 0 ? orders : [];
    }
    getById(id) {
        return Promise.resolve(this.orders.find((order) => order.id === id));
    }
}
exports.FakeOrderRepository = FakeOrderRepository;
