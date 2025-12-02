import { Router } from "express";
import { authMiddlewareJWT } from "@app/users/middleware";
import { container } from "src/app";
import { MesaController } from "../../app/mesas/MesaController";

/**
 * @swagger
 * tags:
 *   name: Mesas
 *   description: Gestión de mesas
 */

/**
 * @swagger
 * /mesas:
 *   get:
 *     summary: Obtener todas las mesas
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mesas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mesa'
 *   post:
 *     summary: Crear una nueva mesa
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MesaCreate'
 *     responses:
 *       201:
 *         description: Mesa creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 */

/**
 * @swagger
 * /mesas/{id}:
 *   get:
 *     summary: Obtener mesa por ID
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la mesa
 *     responses:
 *       200:
 *         description: Mesa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       404:
 *         description: Mesa no encontrada
 *   put:
 *     summary: Actualizar mesa
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la mesa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MesaUpdate'
 *     responses:
 *       200:
 *         description: Mesa actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       404:
 *         description: Mesa no encontrada
 *   delete:
 *     summary: Eliminar mesa
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la mesa
 *     responses:
 *       200:
 *         description: Mesa eliminada
 *       404:
 *         description: Mesa no encontrada
 */

export const mesasRoutes = () => {
  const router = Router();
  const mesaController = container.resolve<MesaController>("mesa-controller");

  router.get("/", authMiddlewareJWT, mesaController.getAllMesas);
  router.post("/", authMiddlewareJWT, mesaController.createMesa);
  router.get("/:id", authMiddlewareJWT, mesaController.getMesaById);
  router.put("/:id", authMiddlewareJWT, mesaController.updateMesa);
  router.delete("/:id", authMiddlewareJWT, mesaController.deleteMesa);

  return router;
};