"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toExpectedClientDetailsResponse = void 0;
const toExpectedClientDetailsResponse = (client, orders) => {
    return {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        dni: client.dni,
        city: client.city,
        address: client.address,
        registeredAt: client.registeredAt.toISOString(),
        orders: orders.map((order) => ({
            id: order.id,
            total: order.total,
            itemsCount: order.items.length,
            status: order.status,
            createdAt: order.createdAt.toISOString(),
        })),
    };
};
exports.toExpectedClientDetailsResponse = toExpectedClientDetailsResponse;
