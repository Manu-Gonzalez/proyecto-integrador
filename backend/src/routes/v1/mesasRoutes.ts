import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const mesasRoutes = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      const mesas = await prisma.mesa.findMany({
        orderBy: { numero: 'asc' }
      });
      res.json(mesas);
    } catch (error) {
      console.error('Error fetching tables:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  router.post("/", async (req, res) => {
    try {
      console.log('Mesa creation request received:');
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);
      console.log('Body type:', typeof req.body);
      
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is required' });
      }
      
      const { numero, capacidad } = req.body;
      
      if (!numero || !capacidad) {
        return res.status(400).json({ error: 'Número y capacidad son requeridos' });
      }
      
      const newMesa = await prisma.mesa.create({
        data: {
          numero,
          capacidad,
          estado: "disponible"
        }
      });
      
      res.status(201).json(newMesa);
    } catch (error: any) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Ya existe una mesa con ese número' });
      }
      console.error('Error creating table:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body || {};
      
      console.log('Updating mesa estado:', { id, estado, body: req.body });
      
      const updatedMesa = await prisma.mesa.update({
        where: { id: parseInt(id) },
        data: { estado }
      });
      
      console.log('Updated mesa result:', updatedMesa);
      res.json(updatedMesa);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Mesa no encontrada' });
      }
      console.error('Error updating table:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      await prisma.mesa.delete({
        where: { id: parseInt(id) }
      });
      
      res.status(204).send();
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Mesa no encontrada' });
      }
      console.error('Error deleting table:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  return router;
};