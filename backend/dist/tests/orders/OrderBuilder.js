"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderBuilder = void 0;
const crypto_1 = require("crypto");
class OrderBuilder {
    constructor() {
        this.order = {
            id: (0, crypto_1.randomUUID)(),
            total: 1000,
            status: "pending",
            createdAt: new Date(),
            items: [],
        };
    }
    addItem(item) {
        var _a;
        this.order.items.push({
            id: (0, crypto_1.randomUUID)(),
            productId: (0, crypto_1.randomUUID)(),
            quantity: (_a = item === null || item === void 0 ? void 0 : item.quantity) !== null && _a !== void 0 ? _a : 1,
        });
        return this;
    }
    setStatus(status) {
        this.order.status = status;
        return this;
    }
    build() {
        return this.order;
    }
}
exports.OrderBuilder = OrderBuilder;
