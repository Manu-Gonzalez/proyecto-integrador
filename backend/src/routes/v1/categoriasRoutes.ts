import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export const categoriasRoutes = () => {
    const router = Router();

    router.get("/", async (req, res) => {
        try {
            const categorias = await prisma.categoria.findMany();
            res.json(categorias);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    router.post("/", async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ error: 'No se recibieron datos' });
            }
            
            const { nombre } = req.body;
            
            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }
            
            const newCategoria = await prisma.categoria.create({
                data: {
                    nombre
                }
            });
            
            res.status(201).json(newCategoria);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            
            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }
            
            const updatedCategoria = await prisma.categoria.update({
                where: { id: parseInt(id) },
                data: {
                    nombre
                }
            });
            
            res.json(updatedCategoria);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            console.error('Error updating category:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            console.log('Attempting to delete category with ID:', id);
            
            const deletedCategory = await prisma.categoria.delete({
                where: { id: parseInt(id) }
            });
            
            console.log('Category deleted successfully:', deletedCategory);
            res.status(200).json({ message: 'Categoría eliminada con éxito' });
        } catch (error: any) {
            console.error('Error deleting category:', error);
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    return router;
};