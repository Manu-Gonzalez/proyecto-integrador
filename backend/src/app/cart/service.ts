import { CartRepository } from "./repositories/CartRepository";
import { AddItemToCart, UpdateCartItem, CartWithItems } from "./models/CartTypes";

export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async getCartByUserId(userId: number): Promise<CartWithItems | null> {
    return await this.cartRepository.getCartByUserId(userId);
  }

  async addItem(userId: number, item: AddItemToCart): Promise<CartWithItems> {
    return await this.cartRepository.addItem(userId, item);
  }

  async updateItem(userId: number, itemId: number, updates: UpdateCartItem): Promise<CartWithItems> {
    return await this.cartRepository.updateItem(userId, itemId, updates);
  }

  async removeItem(userId: number, itemId: number): Promise<CartWithItems> {
    return await this.cartRepository.removeItem(userId, itemId);
  }

  async clearCart(userId: number): Promise<void> {
    return await this.cartRepository.clearCart(userId);
  }
}