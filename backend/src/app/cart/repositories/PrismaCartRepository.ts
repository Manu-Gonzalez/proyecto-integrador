import { prisma } from "../../../config/prismaClient";
import { CartRepository } from "./CartRepository";
import { AddItemToCart, UpdateCartItem, CartWithItems } from "../models/CartTypes";

export class PrismaCartRepository implements CartRepository {
  async getCartByUserId(userId: number): Promise<CartWithItems | null> {
    return prisma.carrito.findUnique({
      where: { usuarioId: userId },
      include: {
        items: {
          include: {
            producto: {
              select: {
                id: true,
                nombre: true,
                precio: true,
                imagen: true
              }
            }
          }
        }
      }
    });
  }

  async createCart(userId: number): Promise<CartWithItems> {
    return prisma.carrito.create({
      data: { usuarioId: userId },
      include: {
        items: {
          include: {
            producto: {
              select: {
                id: true,
                nombre: true,
                precio: true,
                imagen: true
              }
            }
          }
        }
      }
    });
  }

  async addItem(userId: number, item: AddItemToCart): Promise<CartWithItems> {
    // Obtener o crear carrito
    let cart = await this.getCartByUserId(userId);
    if (!cart) {
      cart = await this.createCart(userId);
    }

    // Obtener precio del producto
    const producto = await prisma.producto.findUnique({
      where: { id: item.productoId }
    });

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    // Verificar si el item ya existe en el carrito
    const existingItem = cart.items.find(i => i.productoId === item.productoId);

    if (existingItem) {
      // Actualizar cantidad
      await prisma.itemCarrito.update({
        where: { id: existingItem.id },
        data: {
          cantidad: existingItem.cantidad + item.cantidad,
          subtotal: (existingItem.cantidad + item.cantidad) * producto.precio
        }
      });
    } else {
      // Crear nuevo item
      await prisma.itemCarrito.create({
        data: {
          carritoId: cart.id,
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnitario: producto.precio,
          subtotal: item.cantidad * producto.precio
        }
      });
    }

    // Retornar carrito actualizado
    return this.getCartByUserId(userId) as Promise<CartWithItems>;
  }

  async updateItem(userId: number, itemId: number, updates: UpdateCartItem): Promise<CartWithItems> {
    // Verificar que el item pertenece al carrito del usuario
    const item = await prisma.itemCarrito.findFirst({
      where: {
        id: itemId,
        carrito: {
          usuarioId: userId
        }
      }
    });

    if (!item) {
      throw new Error("Item no encontrado en el carrito");
    }

    await prisma.itemCarrito.update({
      where: { id: itemId },
      data: {
        cantidad: updates.cantidad,
        subtotal: updates.cantidad * item.precioUnitario
      }
    });

    return this.getCartByUserId(userId) as Promise<CartWithItems>;
  }

  async removeItem(userId: number, itemId: number): Promise<CartWithItems> {
    // Verificar que el item pertenece al carrito del usuario
    const item = await prisma.itemCarrito.findFirst({
      where: {
        id: itemId,
        carrito: {
          usuarioId: userId
        }
      }
    });

    if (!item) {
      throw new Error("Item no encontrado en el carrito");
    }

    await prisma.itemCarrito.delete({
      where: { id: itemId }
    });

    return this.getCartByUserId(userId) as Promise<CartWithItems>;
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.getCartByUserId(userId);
    if (cart) {
      await prisma.itemCarrito.deleteMany({
        where: { carritoId: cart.id }
      });
    }
  }
}