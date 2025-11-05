"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriasRoutes = void 0;
const express_1 = require("express");
/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Gestión de categorías de productos
 */
/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaCreate'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos inválidos
 */
/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría no encontrada
 *   put:
 *     summary: Actualizar categoría
 *     tags: [Categorías]
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
 *             $ref: '#/components/schemas/CategoriaCreate'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       404:
 *         description: Categoría no encontrada
 *       401:
 *         description: No autorizado
 *   delete:
 *     summary: Eliminar categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 *       401:
 *         description: No autorizado
 */
const categoriasRoutes = () => {
    const router = (0, express_1.Router)();
    router.get("/", (req, res) => {
        res.json({ message: "Categorías endpoint" });
    });
    return router;
};
exports.categoriasRoutes = categoriasRoutes;
