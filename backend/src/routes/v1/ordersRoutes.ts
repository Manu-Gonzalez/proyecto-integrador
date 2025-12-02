import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gestión de pedidos del sistema
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [pendiente, confirmado, entregado, cancelado]
 *         description: Filtrar por estado del pedido
 *       - in: query
 *         name: usuarioId
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de usuario
 *       - in: query
 *         name: fechaDesde
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha desde (YYYY-MM-DD)
 *       - in: query
 *         name: fechaHasta
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha hasta (YYYY-MM-DD)
 *       - in: query
 *         name: totalMin
 *         schema:
 *           type: number
 *           format: float
 *         description: Total mínimo
 *       - in: query
 *         name: totalMax
 *         schema:
 *           type: number
 *           format: float
 *         description: Total máximo
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número de página (para paginación)
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Límite de resultados por página
 *       - in: query
 *         name: ordenarPor
 *         schema:
 *           type: string
 *           enum: [fecha, total, estado]
 *         description: Campo para ordenar
 *       - in: query
 *         name: orden
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Dirección del ordenamiento
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoCreate'
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener pedido por ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido no encontrado
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /orders/{id}/estado:
 *   put:
 *     summary: Actualizar estado del pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, confirmado, entregado, cancelado]
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       404:
 *         description: Pedido no encontrado
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Estado inválido
 */

export const ordersRoutes = () => {
    const router = Router();

    router.post("/", async (req, res) => {
        try {
            const { items, mesaId, total } = req.body;
            const userId = 1; // Mock user ID
            
            // Create order
            const pedido = await prisma.pedido.create({
                data: {
                    usuarioId: userId,
                    mesaId: parseInt(mesaId),
                    total: parseFloat(total),
                    estado: 'pendiente'
                }
            });
            
            // Create order details
            for (const item of items) {
                await prisma.detallePedido.create({
                    data: {
                        pedidoId: pedido.id,
                        productoId: item.id,
                        cantidad: item.quantity,
                        subtotal: item.precio * item.quantity
                    }
                });
            }
            
            // Update table status to occupied
            await prisma.mesa.update({
                where: { numero: parseInt(mesaId) },
                data: { estado: 'ocupada' }
            });
            
            res.status(201).json({ 
                message: 'Pedido creado exitosamente',
                pedido: {
                    id: pedido.id,
                    mesa: mesaId,
                    total: total,
                    estado: 'pendiente'
                }
            });
        } catch (error: any) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    return router;
};
