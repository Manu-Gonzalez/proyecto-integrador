import { AddItemToCart, UpdateCartItem, CartWithItems } from "../models/CartTypes";

export interface CartRepository {
  getCartByUserId(userId: number): Promise<CartWithItems | null>;
  createCart(userId: number): Promise<CartWithItems>;
  addItem(userId: number, item: AddItemToCart): Promise<CartWithItems>;
  updateItem(userId: number, itemId: number, updates: UpdateCartItem): Promise<CartWithItems>;
  removeItem(userId: number, itemId: number): Promise<CartWithItems>;
  clearCart(userId: number): Promise<void>;
}