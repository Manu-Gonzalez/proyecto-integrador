import Order from "./Order";

export type OrderCreate = Pick<
    Order,
    "status" | "createdAt" | "total"
>;