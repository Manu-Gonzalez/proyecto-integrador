import { Router } from "express";
import { authMiddlewareJWT } from "@app/users/middleware";
import { container } from "@diContainer/container";
import { CartController } from "../../app/cart/controller";

/**
 * @swagger
 * tags:
 *   name: Carrito
 *   description: Gestión del carrito de compras
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtener carrito del usuario actual
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Agregar producto al carrito
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddItemToCart'
 *     responses:
 *       200:
 *         description: Producto agregado al carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos inválidos
 *   delete:
 *     summary: Vaciar carrito
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito vaciado exitosamente
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /cart/items/{itemId}:
 *   put:
 *     summary: Actualizar cantidad de item en carrito
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del item en el carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartItem'
 *     responses:
 *       200:
 *         description: Item actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Item no encontrado
 *   delete:
 *     summary: Remover item del carrito
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del item en el carrito
 *     responses:
 *       200:
 *         description: Item removido del carrito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Item no encontrado
 */

export const cartRoutes = () => {
  const router = Router();
  const cartController = container.resolve<CartController>("cart-controller");

  router.get("/", authMiddlewareJWT, cartController.getCart);
  router.post("/", authMiddlewareJWT, cartController.addItem);
  router.delete("/", authMiddlewareJWT, cartController.clearCart);

  router.put("/items/:itemId", authMiddlewareJWT, cartController.updateItem);
  router.delete("/items/:itemId", authMiddlewareJWT, cartController.removeItem);

  return router;
};