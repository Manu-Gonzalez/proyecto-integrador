import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoCreate'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *   put:
 *     summary: Actualizar producto
 *     tags: [Productos]
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
 *             $ref: '#/components/schemas/ProductoCreate'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autorizado
 *   delete:
 *     summary: Eliminar producto
 *     tags: [Productos]
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
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autorizado
 */

export const productosRoutes = () => {
    const router = Router();

    router.get("/", async (req, res) => {
        try {
            const productos = await prisma.producto.findMany({
                include: {
                    categoria: true
                }
            });
            res.json(productos);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    router.post("/", async (req, res) => {
        try {
            const { nombre, precio, imagen, categoriaId } = req.body;
            
            if (!nombre || !precio || !categoriaId) {
                return res.status(400).json({ error: 'Datos requeridos faltantes' });
            }
            
            let imagenPath = null;
            
            // Save image if provided
            if (imagen && imagen.startsWith('data:image/')) {
                // Get category name for folder
                const categoria = await prisma.categoria.findUnique({
                    where: { id: parseInt(categoriaId) }
                });
                
                const categoryFolder = categoria?.nombre.toLowerCase().replace(/\s+/g, '-') || 'otros';
                const base64Data = imagen.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const fileName = `producto_${Date.now()}.jpg`;
                const filePath = path.join(__dirname, '../../../../frontend/public/images', categoryFolder, fileName);
                
                // Ensure directory exists
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                
                fs.writeFileSync(filePath, buffer);
                imagenPath = `/images/${categoryFolder}/${fileName}`;
            }
            
            const newProducto = await prisma.producto.create({
                data: {
                    nombre,
                    precio: parseFloat(precio),
                    imagen: imagenPath,
                    categoriaId: parseInt(categoriaId)
                },
                include: {
                    categoria: true
                }
            });
            
            res.status(201).json(newProducto);
        } catch (error: any) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, precio, imagen, categoriaId } = req.body;
            
            if (!nombre || !precio || !categoriaId) {
                return res.status(400).json({ error: 'Datos requeridos faltantes' });
            }
            
            let imagenPath = imagen;
            
            // Save new image if provided as base64
            if (imagen && imagen.startsWith('data:image/')) {
                // Get category name for folder
                const categoria = await prisma.categoria.findUnique({
                    where: { id: parseInt(categoriaId) }
                });
                
                const categoryFolder = categoria?.nombre.toLowerCase().replace(/\s+/g, '-') || 'otros';
                const base64Data = imagen.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const fileName = `producto_${Date.now()}.jpg`;
                const filePath = path.join(__dirname, '../../../../frontend/public/images', categoryFolder, fileName);
                
                // Ensure directory exists
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                
                fs.writeFileSync(filePath, buffer);
                imagenPath = `/images/${categoryFolder}/${fileName}`;
            }
            
            const updatedProducto = await prisma.producto.update({
                where: { id: parseInt(id) },
                data: {
                    nombre,
                    precio: parseFloat(precio),
                    imagen: imagenPath,
                    categoriaId: parseInt(categoriaId)
                },
                include: {
                    categoria: true
                }
            });
            
            res.json(updatedProducto);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            console.log('Attempting to delete product with ID:', id);
            
            const deletedProduct = await prisma.producto.delete({
                where: { id: parseInt(id) }
            });
            
            console.log('Product deleted successfully:', deletedProduct);
            res.status(200).json({ message: 'Producto eliminado con éxito' });
        } catch (error: any) {
            console.error('Error deleting product:', error);
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    return router;
};