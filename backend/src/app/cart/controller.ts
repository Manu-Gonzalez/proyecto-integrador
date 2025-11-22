import { CartService } from "./service";
import { ExpressFunction } from "../../shared/types/ExpressFunction";
import CustomizedError from "../../shared/classes/CustomizedError";
import { AddItemToCart, UpdateCartItem } from "./models/CartTypes";

export class CartController {
  constructor(private readonly cartService: CartService) {}

  public getCart: ExpressFunction = async (req, res, next) => {
    try {
      const userId = (req as any).user.id;
      const cart = await this.cartService.getCartByUserId(userId);

      if (!cart) {
        return res.json({ items: [], total: 0 });
      }

      const total = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
      res.json({ ...cart, total });
    } catch (error: any) {
      next(new CustomizedError(error.message, 500));
    }
  };

  public addItem: ExpressFunction = async (req, res, next) => {
    try {
      const userId = (req as any).user.id;
      const item: AddItemToCart = req.body;

      const cart = await this.cartService.addItem(userId, item);
      const total = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

      res.json({ ...cart, total });
    } catch (error: any) {
      next(new CustomizedError(error.message, 500));
    }
  };

  public updateItem: ExpressFunction = async (req, res, next) => {
    try {
      const userId = (req as any).user.id;
      const itemId = parseInt(req.params.itemId);
      const updates: UpdateCartItem = req.body;

      const cart = await this.cartService.updateItem(userId, itemId, updates);
      const total = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

      res.json({ ...cart, total });
    } catch (error: any) {
      next(new CustomizedError(error.message, 500));
    }
  };

  public removeItem: ExpressFunction = async (req, res, next) => {
    try {
      const userId = (req as any).user.id;
      const itemId = parseInt(req.params.itemId);

      const cart = await this.cartService.removeItem(userId, itemId);
      const total = cart ? cart.items.reduce((sum, item) => sum + item.subtotal, 0) : 0;

      res.json({ ...cart, total });
    } catch (error: any) {
      next(new CustomizedError(error.message, 500));
    }
  };

  public clearCart: ExpressFunction = async (req, res, next) => {
    try {
      const userId = (req as any).user.id;

      await this.cartService.clearCart(userId);
      res.json({ message: "Carrito vaciado exitosamente" });
    } catch (error: any) {
      next(new CustomizedError(error.message, 500));
    }
  };
}